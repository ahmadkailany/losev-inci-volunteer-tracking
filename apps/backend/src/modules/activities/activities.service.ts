import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ApproveActivityDto } from './dto/approve-activity.dto';
import { Status } from '@prisma/client';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async createActivity(userId: string, createActivityDto: CreateActivityDto) {
    const activity = await this.prisma.activity.create({
      data: {
        ...createActivityDto,
        date: new Date(createActivityDto.date),
        studentId: userId,
      },
    });

    return activity;
  }

  async getActivities(userId: string, role: string, status?: string) {
    if (role === 'STUDENT') {
      return this.prisma.activity.findMany({
        where: {
          studentId: userId,
          ...(status && { status: status as Status }),
        },
        orderBy: { date: 'desc' },
      });
    }

    if (role === 'TEACHER') {
      // Get all activities from students in the teacher's school
      const teacher = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      return this.prisma.activity.findMany({
        where: {
          student: { school: teacher?.school },
          ...(status && { status: status as Status }),
        },
        include: { student: true },
        orderBy: { date: 'desc' },
      });
    }

    // ADMIN - all activities
    return this.prisma.activity.findMany({
      where: status ? { status: status as Status } : undefined,
      include: { student: true },
      orderBy: { date: 'desc' },
      take: 1000,
    });
  }

  async approveActivity(
    activityId: string,
    approverId: string,
    approveActivityDto: ApproveActivityDto,
  ) {
    const activity = await this.prisma.activity.findUnique({
      where: { id: activityId },
      include: { student: true },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    const approver = await this.prisma.user.findUnique({
      where: { id: approverId },
    });

    // Check if approver is authorized (same school teacher or admin)
    if (
      approver?.role === 'TEACHER' &&
      approver.school !== activity.student.school
    ) {
      throw new ForbiddenException(
        'You can only approve activities from your school',
      );
    }

    const updatedActivity = await this.prisma.activity.update({
      where: { id: activityId },
      data: {
        status: approveActivityDto.status,
        approverNote: approveActivityDto.comment,
        approvedBy: approverId,
        approvedAt: new Date(),
      },
    });

    return updatedActivity;
  }

  async getStudentHours(userId: string) {
    const activities = await this.prisma.activity.findMany({
      where: {
        studentId: userId,
        status: Status.APPROVED,
      },
    });

    const totalHours = activities.reduce((sum, activity) => {
      return sum + parseFloat(activity.hours.toString());
    }, 0);

    const thisYear = new Date().getFullYear();
    const yearActivities = activities.filter(
      (a) => a.date.getFullYear() === thisYear,
    );
    const yearHours = yearActivities.reduce((sum, activity) => {
      return sum + parseFloat(activity.hours.toString());
    }, 0);

    const thisMonth = new Date().getMonth();
    const monthActivities = activities.filter(
      (a) =>
        a.date.getMonth() === thisMonth &&
        a.date.getFullYear() === thisYear,
    );
    const monthHours = monthActivities.reduce((sum, activity) => {
      return sum + parseFloat(activity.hours.toString());
    }, 0);

    return {
      totalHours,
      monthHours,
      yearHours,
      target: 30,
      percentageToTarget: Math.min((totalHours / 30) * 100, 100),
    };
  }

  async getSchoolPendingActivities(userId: string) {
    const teacher = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const activities = await this.prisma.activity.findMany({
      where: {
        status: Status.PENDING,
        student: { school: teacher?.school },
      },
      include: { student: true },
      orderBy: { date: 'asc' },
    });

    return activities;
  }
}
