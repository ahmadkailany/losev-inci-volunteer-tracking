import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        school: true,
        city: true,
        district: true,
        grade: true,
        phone: true,
        bio: true,
        profileImageUrl: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        school: true,
        city: true,
        district: true,
        grade: true,
        phone: true,
        bio: true,
        profileImageUrl: true,
      },
    });

    return user;
  }

  async getStudents() {
    const students = await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        school: true,
        city: true,
        grade: true,
      },
    });

    return students;
  }
}
