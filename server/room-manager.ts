import { type Client, Room } from '~/server/util'
import { getClientRoom } from '~/server/routes/socket.io'

const characters = 'ABCDEFGHJKMNPQRSTUVWXYZ123456789'
export const codeLength = 4
export type JoinCode = `${string & { length: typeof codeLength }}`

const rooms = new Map<JoinCode, Room>()

export function generateJoinCode(): JoinCode {
  let code = ''
  let retries = 10

  do {
    code = ''
    for (let i = 0; i < codeLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }
  } while (rooms.has(<JoinCode>code) && retries-- > 0)
  // TODO add real denial of service protection

  return <JoinCode>code
}

export function createRoom(client: Client) {
  const room = new Room(client)
  rooms.set(room.joinCode, room)
  room.addPlayer(client)
  return room
}

export function removeRoom(room: Room) {
  rooms.delete(room.joinCode)
  getClientRoom().delete(room.host)
}

export function getAllRooms() {
  return rooms as ReadonlyMap<JoinCode, Room>
}
