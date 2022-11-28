import { Injectable } from '@angular/core';
import { NzNotificationService, NzNotificationPlacement } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  createNotification(action: string, message: string) {
    message = "<h4>" + message + "</h4>";
    this.notification.create(action, '', message);
  }
}
