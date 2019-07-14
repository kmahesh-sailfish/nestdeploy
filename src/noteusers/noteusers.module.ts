import { Module } from '@nestjs/common';
import { NoteusersController } from './noteusers.controller';
import { NoteusersService } from './noteusers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notese } from '../entity/notes';
import { Users } from '../entity/users';

@Module({
  imports:[TypeOrmModule.forFeature([Notese,Users])],
  controllers: [NoteusersController],
  providers: [NoteusersService]
})
export class NoteusersModule {}
