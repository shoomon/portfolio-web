import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGuestBookDto, UpdateGuestBookDto } from 'src/dtos/guest_book.dto';
import { Guest_Book } from 'src/entities/guest_books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Guest_BooksService {
    constructor(
        @InjectRepository(Guest_Book)
        private readonly guest_bookRepository: Repository<Guest_Book>,
    ) { }

    async get(page: number, size: number) {
        const [data, total] = await this.guest_bookRepository.findAndCount({
            where: { isVisible: true },
            skip: (page - 1) * size,
            take: size,
            order: { createdAt: 'DESC' }
        })

        const hasNextPage = (page * size) < total;

        return { data, pageInfo: { page, hasNextPage } };
    }

    async getOneById(id: number) {
        const guestBook = await this.guest_bookRepository.findOne({ where: { id } })
        return guestBook
    }

    async create(createGuestBookRequest: CreateGuestBookDto): Promise<Guest_Book> {
        const newDiary = this.guest_bookRepository.create({ ...createGuestBookRequest });
        return await this.guest_bookRepository.save(newDiary);
    }

    async update(id: number, updateGuestBookRequest: UpdateGuestBookDto) {
        const toUpdate = await this.guest_bookRepository.findOne({ where: { id: id } });
        if (!toUpdate) {
            throw new NotFoundException(`Guest Book with id ${id} is not found.`);
        }

        const isValidPassword = updateGuestBookRequest.password === toUpdate.password;
        if (!isValidPassword) {
            throw new UnauthorizedException(`Invalid password.`);
        }
        const updatedGuest_Book = { ...toUpdate, ...updateGuestBookRequest }

        await this.guest_bookRepository.save(updatedGuest_Book);
        return this.guest_bookRepository.findOne({ where: { id: id } });
    }

    async delete(id: number): Promise<void> {
        const toDelete = await this.guest_bookRepository.findOne({ where: { id: id } });

        if (!toDelete) {
            throw new NotFoundException(`Guest Book with id ${id} is not found.`);
        }

        await this.guest_bookRepository.delete(toDelete.id);
        return;
    }

    async hide(id: number): Promise<void> {
        await this.guest_bookRepository.update(id, { isVisible: false });
        return;
    }

    async unHide(id: number): Promise<void> {
        await this.guest_bookRepository.update(id, { isVisible: true });
        return;
    }

    async getHided(): Promise<Guest_Book[]> {
        const hided = this.guest_bookRepository.find({ where: { isVisible: false } });
        return hided
    }
}
