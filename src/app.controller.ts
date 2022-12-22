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
import { CreateNotificationBody } from './prisma/CreateNotificationBody';

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
  async createNotification(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;
    const notification = await this.prismaService.notification.create({
      data: {
        content,
        category,
        recipientId: randomUUID(),
      },
    });

    return notification;
  }
}
