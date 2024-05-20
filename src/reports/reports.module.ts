import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { EmailService } from './email/email.service';
import { Guest_BooksService } from 'src/guest_books/guest_books.service';
import { Guest_Book } from 'src/entities/guest_books.entity';
import { Report } from 'src/entities/report.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Report, Guest_Book])],
    controllers: [ReportsController],
    providers: [ReportsService, EmailService, Guest_BooksService]
})
export class ReportsModule { }
