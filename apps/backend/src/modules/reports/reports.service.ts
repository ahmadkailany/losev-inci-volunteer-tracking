import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getNationalStatistics() {
    const stats = await this.prisma.nationalStatistic.findFirst();
    return (
      stats || {
        totalStudents: 0,
        totalTeachers: 0,
        totalHours: 0,
        totalActivities: 0,
        activeCities: 0,
        activeSchools: 0,
      }
    );
  }

  async getTopStudents() {
    const activities = await this.prisma.activity.findMany({
      where: { status: 'APPROVED' },
      include: { student: { select: { id: true, name: true, school: true } } },
    });

    const studentHours: { [key: string]: any } = {};
    activities.forEach((activity) => {
      if (!studentHours[activity.studentId]) {
        studentHours[activity.studentId] = {
          ...activity.student,
          hours: 0,
        };
      }
      studentHours[activity.studentId].hours += parseFloat(
        activity.hours.toString(),
      );
    });

    return Object.values(studentHours)
      .sort((a: any, b: any) => b.hours - a.hours)
      .slice(0, 10);
  }

  async getTopSchools() {
    const stats = await this.prisma.schoolStatistic.findMany({
      orderBy: { totalHours: 'desc' },
      take: 10,
    });
    return stats;
  }

  async getSchoolReport(userId: string) {
    const teacher = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const schoolStats = await this.prisma.schoolStatistic.findUnique({
      where: { school: teacher?.school },
    });

    const students = await this.prisma.user.findMany({
      where: { school: teacher?.school, role: 'STUDENT' },
    });

    return {
      school: teacher?.school,
      stats: schoolStats,
      studentCount: students.length,
    };
  }
}
