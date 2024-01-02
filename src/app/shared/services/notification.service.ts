import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private message: NzMessageService,
    private notification: NzNotificationService
    ) {}

  createMessage(type: string, message: string): void {
    this.message.create(type, `${message}`);
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(
      type,
      title,
      content
    );
  }

}
