import { Test, TestingModule } from '@nestjs/testing';
import { NoteusersController } from './noteusers.controller';

describe('Noteusers Controller', () => {
  let controller: NoteusersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteusersController],
    }).compile();

    controller = module.get<NoteusersController>(NoteusersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
