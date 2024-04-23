import { type codeLength, generateJoinCode } from './room-manager'
import type { Socket } from 'socket.io'
import type { Question } from '~/utils/utils'
import { RoomSettings, getQuiz, GenerativeQuiz } from '~/utils/utils'
import type { ServerToClientEvents, UUID } from '~/utils/socket-types'
import { createQuizzes } from '~/utils/countries'
import type { EventParams } from '@socket.io/component-emitter'

export class Client {
  private _username
  private readonly _uuid: UUID
  private readonly _creationDate = new Date()
  private _lastPacket = new Date()
  private _gamesPlayed: UUID[] = []
  private _socket: Socket

  constructor(socket: Socket, username: string, uuid: UUID) {
    this._username = username
    this._uuid = uuid
    this._socket = socket
  }

  get uuid() {
    return this._uuid
  }

  get username() {
    return this._username
  }

  set username(username: string) {
    this._username = username
  }

  get creationDate() {
    return this._creationDate
  }

  get lastPacket() {
    return this._lastPacket
  }

  set lastPacket(lastPacket: Date) {
    this._lastPacket = lastPacket
  }

  get gamesPlayed() {
    return this._gamesPlayed
  }

  addGame(gameUuid: UUID) {
    this._gamesPlayed.push(gameUuid)
  }

  get socket() {
    return this._socket
  }

  set socket(socket: Socket) {
    this._socket = socket
  }
}

export class GameClient {
  private readonly _client: Client
  private _score = 0
  private _questionAnswered = false
  private _answerList: Map<number, string> = new Map()

  constructor(client: Client) {
    this._client = client
  }

  get uuid() {
    return this._client.uuid
  }

  get client() {
    return this._client
  }

  get score() {
    return this._score
  }

  get questionAnswered() {
    return this._questionAnswered
  }

  resetScore() {
    this._score = 0
  }

  addScore(score: number) {
    this._score += score
  }

  answerQuestion(questionNumber: number, answer: string) {
    this._answerList.set(questionNumber, answer)
    this._questionAnswered = true
  }

  getAnswer(questionNumber: number) {
    return this._answerList.get(questionNumber)
  }

  resetQuestion() {
    this._questionAnswered = false
  }
}

export type GameState = 'not-started' | 'starting' | 'in-question' | 'paused' | 'finished'

export class Game {
  private readonly _questions: Question[] = []
  private _creationDate: Date = new Date()
  private _currentQuestion = 0
  private _rankings: GameClient[] = []
  private _gameEnd: Date = new Date(0)
  private _state: GameState = 'not-started'
  private _room: Room
  private _questionTimeoutId: NodeJS.Timeout | null = null

  constructor(room: Room, questions: Question[]) {
    this._room = room
    this._questions = questions
  }

  get creationDate() {
    return this._creationDate
  }

  get gameEnd() {
    return this._gameEnd
  }

  set gameEnd(gameEnd: Date) {
    this._gameEnd = gameEnd
  }

  get questions() {
    return this._questions
  }

  get currentQuestion() {
    return this._currentQuestion
  }

  set currentQuestion(currentQuestion: number) {
    this._currentQuestion = currentQuestion
  }

  addClient(client: GameClient) {
    this._rankings.push(client)
  }

  getGameClient(client: Client) {
    return this._rankings.find((c) => c.client === client)
  }

  removeClient(client: GameClient) {
    this._rankings = this._rankings.filter((c) => c !== client)
  }

  sortRankings() {
    this._rankings.sort((a, b) => b.score - a.score)
  }

  get duration() {
    return this._gameEnd.getTime() - this._creationDate.getTime()
  }

  get isFinished() {
    return this._state === 'finished'
  }

  async startGame() {
    if (this._state !== 'not-started') {
      return
    }

    this._state = 'paused'
    this._currentQuestion = 0

    this._rankings = this._room.players.map((p) => new GameClient(p))

    this._room.broadcast('game-started', this._questions.length)
    await this.nextQuestion()
  }

  async nextQuestion() {
    if (this._currentQuestion >= this._questions.length) {
      this._state = 'finished'
      this._room.broadcast('game-ended')
      return
    }

    if (this._state !== 'paused') {
      return
    }

    this._state = 'starting'
    this._rankings.forEach((c) => c.resetQuestion())

    // Move to the next question
    const question = this._questions[this._currentQuestion]

    // Broadcast the question
    this._room.broadcast('question', this._currentQuestion, question.question, question.image)

    // Set the state to in-question
    setTimeout(() => {
      this._room.broadcast('question-allow-answers', question.shuffledAnswers())
      this._state = 'in-question'

      this._questionTimeoutId = setTimeout(() => {
        this.finishQuestion()
      }, this._room.settings.questionTimer)
    }, this._room.settings.allowAnswerTimer)
  }

  async handleAnswer(client: GameClient, answer: string) {
    if (this._state !== 'in-question') {
      client.client.socket.emit(
        'game-error',
        'question-not-allowed',
        'The game is not allowing questions right now!',
      )
      return
    }

    client.answerQuestion(this._currentQuestion, answer)

    const peopleAnswered = this._rankings
      .map((c) => (c.questionAnswered ? c.uuid : null))
      .filter((c) => c !== null)
    this._room.host.socket.emit('question-people-answered', peopleAnswered as UUID[])

    const allAnswered = this._rankings
      .filter((gc) => gc != this.getGameClient(this._room.host))
      .every((c) => c.questionAnswered)

    if (allAnswered) {
      await this.finishQuestion()
    }
  }

  async finishQuestion() {
    if (this._state !== 'in-question') {
      return
    }

    if (this._questionTimeoutId) {
      clearTimeout(this._questionTimeoutId)
    }
    this._questionTimeoutId = null

    this._state = 'paused'
    this._currentQuestion++

    const question = this._questions[this._currentQuestion]

    for (const client of this._rankings) {
      const answer = client.getAnswer(this._currentQuestion)
      if (!answer || question.correctAnswer() !== answer) {
        client.client.socket.emit(
          'question-answered-incorrect',
          client.score,
          question.correctAnswer(),
        )
      } else {
        client.addScore(this._room.settings.questionPoints)
        client.client.socket.emit(
          'question-answered-correct',
          client.score,
          this._room.settings.questionPoints,
          question.correctAnswer(),
        )
      }
    }

    const answerCount = question.shuffledAnswers().map((answer) => {
      return {
        answer: answer,
        count: this._rankings.filter((c) => c.getAnswer(this._currentQuestion) === answer).length,
      }
    })

    this._room.host.socket.emit('question-answer-count', answerCount)
  }
}

export class Room {
  private _creationDate: Date = new Date()
  private readonly _joinCode: `${string & { length: typeof codeLength }}`
  private _host: Client
  private _players: Client[] = []
  private _currentGame: Game | null = null
  private _settings: RoomSettings = new RoomSettings()
  private _bannedPlayers: UUID[] = []

  constructor(host: Client, joinCode?: `${string & { length: typeof codeLength }}`) {
    this._host = host
    this._joinCode = joinCode || generateJoinCode()
  }

  get joinCode() {
    return this._joinCode
  }

  get creationDate() {
    return this._creationDate
  }

  get players() {
    return this._players
  }

  addPlayer(player: Client) {
    this._players.push(player)
  }

  removePlayer(player: Client) {
    this._players = this._players.filter((p) => p !== player)
    if (this._currentGame) {
      const gameClient = this._currentGame.getGameClient(player)
      if (gameClient) {
        this._currentGame.removeClient(gameClient)
      }
    }
  }

  bannedPlayers() {
    return this._bannedPlayers
  }

  banPlayer(player: Client) {
    this._bannedPlayers.push(player.uuid)
    this.removePlayer(player)
  }

  get host() {
    return this._host
  }

  set host(host: Client) {
    this._host = host
  }

  get currentGame() {
    return this._currentGame
  }

  set currentGame(game: Game | null) {
    this._currentGame = game
  }

  get settings() {
    return this._settings
  }

  changeSettings(settings: Partial<RoomSettings>) {
    Object.assign(this._settings, settings)
  }

  // noinspection Annotator
  broadcast<T extends keyof ServerToClientEvents>(
    event: T,
    ...args: EventParams<ServerToClientEvents, T>
  ) {
    for (const player of this._players) {
      player.socket.emit(event, ...args)
    }
  }

  startGame() {
    createQuizzes().then(() => {
      const quiz = getQuiz(this._settings.quiz)
      if (!quiz) {
        return
      }
      if (quiz instanceof GenerativeQuiz) {
        quiz.generateQuestions(this._settings.questionCount).then((questions) => {
          this._currentGame = new Game(this, questions)
          this._currentGame.startGame()
        })
      }
    })
  }
}
