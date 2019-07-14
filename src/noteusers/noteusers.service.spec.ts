import { Test, TestingModule } from '@nestjs/testing';
import { NoteusersService } from './noteusers.service';

describe('NoteusersService', () => {
  let service: NoteusersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteusersService],
    }).compile();

    service = module.get<NoteusersService>(NoteusersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
