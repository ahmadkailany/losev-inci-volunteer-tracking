import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('national')
  getNationalReport(@Req() req: any) {
    return this.reportsService.getNationalStatistics();
  }

  @Get('top-students')
  getTopStudents() {
    return this.reportsService.getTopStudents();
  }

  @Get('top-schools')
  getTopSchools() {
    return this.reportsService.getTopSchools();
  }

  @Get('school')
  getSchoolReport(@Req() req: any) {
    return this.reportsService.getSchoolReport(req.user.userId);
  }
}
