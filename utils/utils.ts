const quizzes = new Map<string, Quiz>()

export class RoomSettings {
  /* the maximum number of players allowed in the room */
  maxPlayers = 100
  /* whether the start timer is enabled */
  startTimerEnabled = true
  /* length of time in milliseconds until the game starts after clicking start */
  startTimerLength = 0
  /* number of questions to ask */
  questionCount = 10
  /* length of time in milliseconds to answer a question */
  questionLength = 20000

  /* whether to allow players to choose their own emojis */
  playerEmojis = true
  /* whether to allow players to choose their own names */
  playerCustomNames = true

  /* whether autoplay is enabled */
  autoplayEnabled = false
  /* length of time in milliseconds before the next screen is shown */
  autoplayTimer = 5000

  /* the number of points awarded for answering a question correctly */
  questionBasePoints = 1000
  /* length of time before the question is sent to the player's device after shown to the host */
  allowAnswerTimer = 0

  /* whether to enable point decay */
  questionDecayEnabled = true
  /* length of time in milliseconds before the question starts to decay */
  questionDecayDelay = 1000
  /* the minimum number of points a question can decay to */
  questionDecayMinimumPoints = 500

  /* whether to enable streak bonuses */
  questionStreakEnabled = true
  /* the minimum number of questions needed to start a streak */
  questionStreakMinimum = 3
  /* the initial bonus for starting a streak */
  questionStreakInitialBonus = 150
  /* the bonus for each question in a streak */
  questionStreakRecurringBonus = 50

  /* the current gamemode selected */
  quiz = 'world'

  constructor(settings?: Partial<RoomSettings>) {
    Object.assign(this, settings)
  }
}

export class Question {
  /**
   * The question to ask the players.
   */
  private readonly _question: string

  /**
   * The correct answer.
   */
  private readonly _correct: string

  /**
   * The wrong answers.
   */
  private readonly _incorrect: string[]

  /**
   * An optional image url to display with the question.
   */
  private readonly _image?: string

  constructor(question: string, correct: string, incorrect: string[], image?: string) {
    this._question = question
    this._correct = correct
    this._incorrect = incorrect
    this._image = image
  }

  get question() {
    return this._question
  }

  get image() {
    return this._image
  }

  /**
   * Check if the given answer is correct.
   */
  isCorrect(answer: string) {
    return this._correct === answer
  }

  /**
   * Shuffle the answers, so the correct answer is not always in the same position.
   */
  shuffledAnswers() {
    const answers = [this._correct, ...this._incorrect]
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[answers[i], answers[j]] = [answers[j], answers[i]]
    }
    return answers
  }

  /**
   * Get the correct answer.
   */
  correctAnswer() {
    return this._correct
  }
}

export type QuizOptions = object

export class Quiz {
  protected _questions: Question[]
  _quizOptions: QuizOptions

  constructor(questions: Question[], quizOptions?: QuizOptions) {
    this._questions = questions
    this._quizOptions = quizOptions || {}
  }

  get questions() {
    return this._questions
  }
}

export interface Answer {
  question: string
  answer: string
  image?: string
}

export class GenerativeQuiz extends Quiz {
  _allAnswers: Answer[]
  _filter: (answers: Answer[]) => Answer[]

  constructor(
    allAnswers: Answer[],
    filter?: (answers: Answer[]) => Answer[],
    quizOptions?: QuizOptions,
  ) {
    super([], quizOptions)
    this._allAnswers = allAnswers
    this._filter = filter || ((answers) => answers)
  }

  async generateQuestions(questionCount?: number) {
    const generatedQuestions: Question[] = []
    const answers = this._filter(this._allAnswers)
    for (let i = 0; i < (questionCount || answers.length); i++) {
      let correct = answers[Math.floor(Math.random() * answers.length)]
      while (!generatedQuestions.every((q) => q.correctAnswer() !== correct.answer)) {
        correct = answers[Math.floor(Math.random() * answers.length)]
      }
      const unavailable: Answer[] = []
      const wrong = Array.from({ length: 3 }, () => {
        let answer = answers[Math.floor(Math.random() * answers.length)]
        // TODO fix if there are less than 4 answers
        while (answer === correct || unavailable.includes(answer)) {
          answer = answers[Math.floor(Math.random() * answers.length)]
        }
        unavailable.push(answer)
        return answer
      })
      generatedQuestions.push(
        new Question(
          correct.question,
          correct.answer,
          wrong.map((a) => a.answer),
          correct.image,
        ),
      )
    }
    return generatedQuestions
  }
}

export function getQuiz(name: string) {
  return quizzes.get(name)
}

export function addQuiz(name: string, quiz: Quiz) {
  quizzes.set(name, quiz)
  return {
    name: name,
    quiz: quiz,
  }
}

export function removeQuiz(name: string) {
  quizzes.delete(name)
}

export function allQuizzes() {
  return quizzes
}

const aquestions = new Question('What is 1 + 1?', '2', ['1', '3', '4'])
const banswers = [
  { question: 'What is 1 + 1?', answer: '2' },
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'What is 3 + 3?', answer: '6' },
  { question: 'What is 4 + 4?', answer: '8' },
  { question: 'What is 5 + 5?', answer: '10' },
  { question: 'What is 6 + 6?', answer: '12' },
]
const aquiz = new Quiz([aquestions])
const bquiz = new GenerativeQuiz(banswers)
addQuiz('test', aquiz)
addQuiz('test2', bquiz)
