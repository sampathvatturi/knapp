import { Injectable } from '@angular/core';
import { NzNotificationService, NzNotificationPlacement } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  createNotification(action: string, message: string) {
     message = "<b>" + message + "</b>";
    let msgColor = 'orange';
    if(action === 'success')
      msgColor = 'green'
    else if(action === 'error')
      msgColor = 'red'    
    this.notification.create(action, '', message, {nzDuration: 4000, nzStyle: {color: msgColor}});
  }
}
