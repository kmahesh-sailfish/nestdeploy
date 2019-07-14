import { Injectable } from '@nestjs/common';
import { userDb, NotesDb } from '../models/notes.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entity/users';
import { Repository } from 'typeorm';
import { Notese } from '../entity/notes';
@Injectable()
export class NoteusersService {
    constructor( @InjectRepository(Users) private readonly userstab: Repository<Users>,
        @InjectRepository(Notese) private readonly notesReposit: Repository<Notese>) {

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
        console.log(user);
        const idea = await this.notesReposit.create({ ...data, users: user });
        return await this.notesReposit.save(idea);
    }
    async getbyId(userId): Promise<any> {
        const users = await this.userstab.findOne({ where: { userId }, relations: ["notes"] });
        return users;
    }

}
