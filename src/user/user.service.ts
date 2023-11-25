import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string) {
    const reuslt = await this.prisma.$queryRaw`EXPLAIN SELECT *
    FROM MOCK_DATA 
    WHERE email=${email}`;
    console.log(reuslt);
    return await this.prisma.mOCK_DATA.findFirst({ where: { email: email } });
  }

  async findOneByFirstName(firstname: string) {
    const reuslt = await this.prisma.$queryRaw`EXPLAIN SELECT *
    FROM MOCK_DATA 
    WHERE first_name=${firstname}`;
    console.log(reuslt);
    return 'good';
  }
}
