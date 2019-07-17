import { Controller, Get, Post, Body, Logger, Param, Put, Delete } from '@nestjs/common';
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

  @Post('signup')
  insertUser(@Body() data): Promise<any> {
    return this.noteService.register(data);
  }
  @Post('notesadd/:userId')
  insertData(@Param('userId') userId: number, @Body() data): Promise<any> {
    return this.noteService.registernotes(userId, data);
  }
  @Get('getnotes/:userId')
  getbyId(@Param('userId') userId: number): Promise<any> {
    return this.noteService.getbyId(userId);
  }
  @Post('login')
  loginUser(@Body() data): Promise<any> {
    return this.noteService.loginUser(data);
  }
  @Put('update/:userId')
  updateNote(@Param('userId') userId: string, @Body() body): Promise<any> {    
    return this.noteService.updateNote(parseInt(userId),body.notesId,body)
  }
  @Delete('delete/:notesId/:userId')
  deleteNote(@Param('notesId') notesId: number, @Param('userId') userId: string) {
    return this.noteService.deleteNote(notesId, parseInt(userId))
  }

}
