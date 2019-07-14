import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteusersModule } from './noteusers/noteusers.module';
@Module({
  imports: [TypeOrmModule.forRoot(), NoteusersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
