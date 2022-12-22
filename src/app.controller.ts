import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from './prisma/prisma.service';
import { Notification } from 'prisma/prisma-client';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async listAllNotifications(): Promise<Notification[]> {
    const notificationsList = await this.prismaService.notification.findMany();
    return notificationsList;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNotification(@Body() body: any) {
    console.log(body);
    const notification = await this.prismaService.notification.create({
      data: {
        content: 'Você tem uma nova solicitação de amizade',
        category: 'Social',
        recipientId: randomUUID(),
      },
    });

    return notification;
  }
}
