import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  title = 'af-notification';
  message:any = null;
  constructor() {}
  ngOnInit(): void {
  this.requestPermission();
  this.onSendNotification()
    
  }

  onSendNotification(){
    
    this.listen();
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
      window.location.href ='https://www.google.com'
    }

  }








}

