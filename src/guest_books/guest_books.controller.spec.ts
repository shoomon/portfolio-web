import { Test, TestingModule } from '@nestjs/testing';
import { GuestBooksController } from './guest_books.controller';

describe('GuestBooksController', () => {
  let controller: GuestBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestBooksController],
    }).compile();

    controller = module.get<GuestBooksController>(GuestBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
