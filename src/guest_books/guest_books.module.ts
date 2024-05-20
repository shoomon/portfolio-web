import { Module } from '@nestjs/common';
import { Guest_BooksController } from './guest_books.controller';
import { Guest_BooksService } from './guest_books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest_Book } from 'src/entities/guest_books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guest_Book])],
  controllers: [Guest_BooksController],
  providers: [Guest_BooksService]
})
export class Guest_BooksModule { }
