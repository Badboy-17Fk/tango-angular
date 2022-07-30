import { Component } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import { OneSignal } from 'onesignal-ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'af-notification';
  message:any = null;
  constructor(private os: OneSignal) {
    
  }
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
    
    
  }
  onHandleTag(tag: string){
    this.os.sendTag("tech", tag).then(()=>{
      console.log("Sent tag: " + tag)
    })
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebaseConfiguration.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
      this.showNotification(payload)
    });
  }

  showNotification(payload: any){
    let notify_data = payload['notification'];
    let title = notify_data['title'];
    let option = {
      body: notify_data['body'],
      icon:"./assets/box.png",
      badge:"./assets/badge.png",
      image:"./assets/tick.png",
    }

    console.log("new message recieved", notify_data);
    let notify: Notification = new Notification(title,option)

    notify.onclick = event => {
      event.preventDefault();
      window.location.href ='http://localhost:4200/login';
    }

  }
}
