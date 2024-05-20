import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { ReportDto } from 'src/dtos/report.dto';
import { Guest_BooksService } from 'src/guest_books/guest_books.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from 'src/entities/report.entity';
import config from 'src/config';

@Injectable()
export class ReportsService {
    constructor(
        private readonly emailService: EmailService,
        private readonly guest_bookService: Guest_BooksService,
        @InjectRepository(Report)
        private readonly reportReposiitory: Repository<Report>
    ) { }

    async get() {
        return this.reportReposiitory.find();
    }

    async getNotReviewed() {
        return this.reportReposiitory.find({ where: { isReviewed: false } });
    }

    async report(reportData: ReportDto) {
        const adminEmail = config.mailer.adminEmail;
        const reportContents = '신고자 이메일: ${reportData.email}\n신고사유: ${reportData.reason}';
        await this.emailService.sendEmail(reportData.email, '방명록 신고', reportContents);

        const report = this.reportReposiitory.create({
            email: reportData.email,
            reason: reportData.reason,
        });
        await this.reportReposiitory.save(report);

        this.guest_bookService.hide(reportData.id);

        return { message: '신고가 접수되었습니다.' };
    }

    async restorePost(id: number) {
        await this.guest_bookService.unHide(id);
        await this.reportReposiitory.update(id, { isReviewed: true });
        return;
    }
}
