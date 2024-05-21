import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Guest_BooksService } from './guest_books.service';
import { CreateGuestBookDto, UpdateGuestBookDto } from 'src/dtos/guest_book.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('guest-book')
@Controller('guest-books')
export class Guest_BooksController {
    constructor(
        private readonly guest_bookService: Guest_BooksService,
    ) { }

    @Get()
    async get(@Query('page') page: number = 1, @Query('size') size: number = 10) {
        return this.guest_bookService.get(page, size);
    }

    @Post()
    async create(@Body() createGuestBookRequest: CreateGuestBookDto) {
        return this.guest_bookService.create(createGuestBookRequest);
    }

    @Patch(`:id`)
    async update(@Param(`id`) id: number, @Body() updateGuestBookRequest: UpdateGuestBookDto) {
        return this.guest_bookService.update(id, updateGuestBookRequest);
    }

    @Delete(`:id`)
    async delete(@Param(`id`) id: number) {
        return this.guest_bookService.delete(id);
    }
}
