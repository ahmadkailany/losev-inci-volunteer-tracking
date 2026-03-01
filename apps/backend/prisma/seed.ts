import { PrismaClient, Role, ActivityType, Status, BadgeType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Clear existing data
  await prisma.activityApproval.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.user.deleteMany();
  await prisma.schoolStatistic.deleteMany();
  await prisma.cityStatistic.deleteMany();
  await prisma.nationalStatistic.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123456', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: Role.ADMIN,
      phone: '+905551234567',
      school: 'LÖSEV Headquarters',
      city: 'İstanbul',
      district: 'Çankırı',
    },
  });
  console.log('✓ Admin user created:', admin.email);

  // Create teacher user
  const teacherPassword = await bcrypt.hash('Teacher@123456', 12);
  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@example.com',
      password: teacherPassword,
      name: 'Ahmet Öğretmen',
      role: Role.TEACHER,
      phone: '+905559876543',
      school: 'Galatasaray Lisesi',
      city: 'İstanbul',
      district: 'Beyoğlu',
    },
  });
  console.log('✓ Teacher user created:', teacher.email);

  // Create student users
  const studentPassword = await bcrypt.hash('Student@123456', 12);
  const students = [];
  const studentEmails = [
    'student1@example.com',
    'student2@example.com',
    'student3@example.com',
    'student4@example.com',
    'student5@example.com',
  ];

  for (let i = 0; i < studentEmails.length; i++) {
    const student = await prisma.user.create({
      data: {
        email: studentEmails[i],
        password: studentPassword,
        name: `Öğrenci ${i + 1}`,
        role: Role.STUDENT,
        phone: `+9055501234${i}`,
        school: 'Galatasaray Lisesi',
        city: 'İstanbul',
        district: 'Beyoğlu',
        grade: `${9 + i}A`,
        teacherId: teacher.id,
        parentConsent: true,
      },
    });
    students.push(student);
  }
  console.log(`✓ ${students.length} student users created`);

  // Create activities for students
  const activityTypes = Object.values(ActivityType);
  let totalHours = 0;

  for (const student of students) {
    const numActivities = Math.floor(Math.random() * 8) + 3;
    for (let i = 0; i < numActivities; i++) {
      const hours = Math.floor(Math.random() * 8) + 2;
      totalHours += hours;
      
      await prisma.activity.create({
        data: {
          studentId: student.id,
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          type: activityTypes[Math.floor(Math.random() * activityTypes.length)] as ActivityType,
          hours: hours,
          description: `Volunteer activity #${i + 1} for ${student.name}`,
          status: Math.random() > 0.3 ? Status.APPROVED : Status.PENDING,
          approverNote: Math.random() > 0.5 ? 'Great work!' : undefined,
        },
      });
    }
  }
  console.log(`✓ Activities created with total ${totalHours} hours`);

  // Create certificates for students with significant hours
  for (const student of students) {
    const studentActivities = await prisma.activity.findMany({
      where: { studentId: student.id, status: Status.APPROVED },
    });
    const studentTotalHours = studentActivities.reduce((sum, activity) => {
      return sum + parseFloat(activity.hours.toString());
    }, 0);

    if (studentTotalHours >= 25) {
      let badgeType = BadgeType.BRONZE;
      if (studentTotalHours >= 200) badgeType = BadgeType.PLATINUM;
      else if (studentTotalHours >= 100) badgeType = BadgeType.GOLD;
      else if (studentTotalHours >= 50) badgeType = BadgeType.SILVER;

      await prisma.certificate.create({
        data: {
          studentId: student.id,
          totalHours: studentTotalHours,
          badgeType,
        },
      });
    }
  }
  console.log('✓ Certificates created');

  // Create school statistics
  await prisma.schoolStatistic.create({
    data: {
      school: 'Galatasaray Lisesi',
      totalStudents: students.length,
      totalHours: totalHours,
      totalActivities: await prisma.activity.count(),
      averageHoursPerStudent: totalHours / students.length,
    },
  });
  console.log('✓ School statistics created');

  // Create city statistics
  await prisma.cityStatistic.create({
    data: {
      city: 'İstanbul',
      totalStudents: students.length,
      totalHours: totalHours,
      totalActivities: await prisma.activity.count(),
      topSchools: JSON.stringify(['Galatasaray Lisesi', 'Kabataş Lisesi']),
    },
  });
  console.log('✓ City statistics created');

  // Create national statistics
  await prisma.nationalStatistic.create({
    data: {
      totalStudents: students.length + 1000,
      totalTeachers: 50,
      totalHours: totalHours + 50000,
      totalActivities: await prisma.activity.count() + 5000,
      activeCities: 81,
      activeSchools: 250,
      topStudents: JSON.stringify(students.slice(0, 5).map(s => ({ name: s.name, hours: 100 }))),
      topSchools: JSON.stringify([
        { school: 'Galatasaray Lisesi', hours: 1500 },
        { school: 'Kabataş Lisesi', hours: 1200 },
      ]),
      activityDistribution: JSON.stringify({
        SEMINAR: 25,
        BOOTH: 20,
        DONATION: 15,
        OTHER: 40,
      }),
      monthlyTrend: JSON.stringify([
        { month: 'Jan', hours: 4500 },
        { month: 'Feb', hours: 5200 },
        { month: 'Mar', hours: 6100 },
      ]),
    },
  });
  console.log('✓ National statistics created');

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
