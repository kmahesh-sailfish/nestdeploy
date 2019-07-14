import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { NoteusersService } from './noteusers.service';
import { userDb } from '../models/notes.interface';
import { UserDetails } from './user.decorator';

@Controller('users')
export class NoteusersController {
  private logger = new Logger('NoteusersController');

  constructor(private readonly noteService: NoteusersService) {

  }
  @Get('getAll')
  getData(): Promise<any> {
    return this.noteService.getAll();
  }

  @Post('register')
  insertUser( @Body() data): Promise<any> {
    return this.noteService.register(data);
  }
  @Post('registernote/:id')
  insertData( @Param('id') id: number, @Body() data): Promise<any> {
    return this.noteService.registernotes(id, data);
  }
  @Get(':id')
  getbyId( @Param('id') id: number): Promise<any> {
    return this.noteService.getbyId(id);
  }

}
