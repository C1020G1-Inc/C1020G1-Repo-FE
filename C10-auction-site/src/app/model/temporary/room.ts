import {UserDTO} from './userDTO';

export class Room {
  roomName: string;
  user: UserDTO;
  newMess: number;
  key: string;


  constructor(roomName: string, user: UserDTO, newMess: number) {
    this.roomName = roomName;
    this.user = user;
    this.newMess = newMess;
  }
}
