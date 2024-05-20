import { Test, TestingModule } from '@nestjs/testing';
import { Guest_BooksService } from './guest_books.service';

describe('Guest_BooksService', () => {
  let service: Guest_BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Guest_BooksService],
    }).compile();

    service = module.get<Guest_BooksService>(Guest_BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
