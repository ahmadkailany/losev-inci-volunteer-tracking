import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ApproveActivityDto } from './dto/approve-activity.dto';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Get()
  getActivities(@Req() req: any, @Query('status') status?: string) {
    return this.activitiesService.getActivities(req.user.userId, req.user.role, status);
  }

  @Post()
  createActivity(@Req() req: any, @Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.createActivity(req.user.userId, createActivityDto);
  }

  @Get('my-hours')
  getMyHours(@Req() req: any) {
    return this.activitiesService.getStudentHours(req.user.userId);
  }

  @Patch(':id/approve')
  approveActivity(
    @Param('id') activityId: string,
    @Req() req: any,
    @Body() approveActivityDto: ApproveActivityDto,
  ) {
    return this.activitiesService.approveActivity(
      activityId,
      req.user.userId,
      approveActivityDto,
    );
  }

  @Get('school/pending')
  getSchoolPendingActivities(@Req() req: any) {
    return this.activitiesService.getSchoolPendingActivities(req.user.userId);
  }
}
