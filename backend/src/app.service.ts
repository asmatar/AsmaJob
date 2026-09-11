import { Injectable } from '@nestjs/common';
import {PrismaService} from "./prisma/prisma.service";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllUsers() {
    const userTest = await this.prisma.user.findMany();
    console.log(userTest);
    return userTest;
  }
}
