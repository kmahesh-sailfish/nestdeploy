import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { userDb, NotesDb } from '../models/notes.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entity/users';
import { Repository } from 'typeorm';
import { Notese } from '../entity/notes';
import { loginDB } from '../models/user.interface';
@Injectable()
export class NoteusersService {
  constructor(@InjectRepository(Users) private readonly userstab: Repository<Users>,
    @InjectRepository(Notese) private readonly notesReposit: Repository<Notese>) {

  }
  private ensureOwnership(idea: Notese, userId: number) {
    if (idea.users.userId !== userId) {
      console.log(typeof(idea.users.userId) +'-notes','userid-'+ typeof(userId))
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }
  //get All data (Admin )
  async getAll(): Promise<any> {
    const users = await this.notesReposit.find({ relations: ["users"] });
    return users;
  }
  async register(payload) {
    let newUser = this.userstab.create(payload)
    return await this.userstab.save(newUser);
  }
  async registernotes(id, data: NotesDb) {
    const user = await this.userstab.findOne({ where: { userId: id } });
    const notes = await this.notesReposit.create({ ...data, users: user });
    return await this.notesReposit.save(notes);
  }
  async getbyId(userId): Promise<any> {
    const users = await this.userstab.findOne({ where: { userId },
                                                relations: ["notes"]
                                              //   order: {
                                              //     notes : "DESC"
                                              // }
                                              });
    return users.notes.reverse();
  }
  async loginUser(data: loginDB): Promise<any> {
    const { email, passwords } = data;
    const user = await this.userstab.findOne({ where: { email } });
    return user;
  }
  async updateNote(
    userId: number,
    notesId: number,
    data: Partial<NotesDb>,
  ) {
    let getNotes = await this.notesReposit.findOne({
      where: { notesId },
      relations: ['users']
    })
    if (!getNotes) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(getNotes, userId);
    await this.notesReposit.update({ notesId }, data);
    return this.getbyId(userId);

  }
  async deleteNote(
    notesId: number,
    userId: number
  ) {
    let getNotes = await this.notesReposit.findOne({
      where: { notesId },
      relations: ['users']
    })
    if (!getNotes) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    console.log(getNotes);
    this.ensureOwnership(getNotes, userId);
    await this.notesReposit.remove(getNotes);
    return this.getbyId(userId);
  }

}
