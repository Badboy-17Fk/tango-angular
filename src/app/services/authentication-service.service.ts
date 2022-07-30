import { Injectable, NgZone } from '@angular/core';
import {GoogleAuthProvider} from 'firebase/auth';
import {FacebookAuthProvider} from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserAdd } from '../models/user-add';
import * as auth from 'firebase/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  logInspinner: boolean = false;

  userData: any;
  constructor(
    public afAuth: AngularFireAuth, 
    public messageService: MessageService,
    public router: Router,
    public ngZons: NgZone,
    public afs: AngularFirestore
     ) {
    //Saving User details in localStorage
      
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user')!)
      }else{
        localStorage.setItem('user','null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
      }

      //SignIn with Email and password
      SignInMethod(email: string, password: string){
        return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result)=>{

          return this.afs.collection('users').doc(result.user?.uid).set({
            uid: result.user?.uid,
            email: email,
           
          }).then(()=>{
            this.messageService.add({
              severity:'success', 
              summary:'Success Message :-)', 
              detail:'Nice you login Successfully'});
            this.ngZons.run(() => {
              
              this.router.navigate(['dashboard']);
              this.saveUserData(result.user)
            })
          })
          
        
          //setTimeout(() => {this.route.navigateByUrl('/add-loans') }, 2000)
          
          

        }).catch((error)=> {

          //Display error here 
          this.messageService.add({
            severity:'error',
            summary: 'LOGIN FAILD :-(',
            detail: 'Sorry they may be an error check you data connection'
            });
          console.log(error)
        })
      }

      /**@Description
       * SignUP WITH User email and Password
       */

      SignUp(email: string, password: string){
        return this.afAuth.createUserWithEmailAndPassword(email, password).then((result)=> {

          this.messageService.add({
            severity:'success', 
            summary:'Success Message :-)', 
            detail:'Nice you created Successfully'});
            this.sendVerificationMail();
          this.saveUserData(result.user)

         
          
        }).catch((error)=>{
          this.messageService.add({
            severity:'error',
            summary: 'created FAILD :-(',
            detail: 'Sorry they may be an error check you data connection'
            });
          console.log(error);
        })
      }

      saveUserData(user: any){

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `user/${user.uid}`
        );
        const userData : UserAdd = {

          uid:user.uid,
          email:user.email,
          displayName:user.displayName,
          photoUrl:user.photoUrl,
          emailVerification: user.emailVerification


        }

        return userRef.set(userData, {
          merge: true
        })

      }
      
      //LOGOUT HERE
      LohOut(){
        return this.afAuth.signOut().then(()=>{
          localStorage.removeItem('user');
          this.router.navigate(['login']);
        })
      }


    

     /**@
   * description GOOGLE AUTHENTICATION TANGO STOCK 
   * BY SOH TAGNE ACHILLE IVES
   */
  GoogleAuth(){
   
    return this.AuthLogin(new GoogleAuthProvider());
   
  }
  //Auth logic to return auth provider
  AuthLogin(provider:any){
    return this.afAuth
    .signInWithPopup(provider)
    .then((result)=> {
     
      this.messageService.add({
        severity:'success', 
        summary:'Success Message :-)', 
        detail:'Nice you login Successfully'});
        // this.router.navigate(['/dashboard'])
        setTimeout(() => {this.router.navigateByUrl('/dashboard') }, 1000)
      console.log("You have Login successfully")
    })
    .catch((error)=> {
      this.messageService.add({
        severity:'error',
        summary: 'LOGIN FAILD :-(',
        detail: 'Sorry they may be an error check you data connection'
        });
      console.log(error)
    })

  }

  /**@
   * Description FACEBOOK AUTHENTICATION TANGO STOCK 
   * BY SOH TAGNE ACHILLE IVES
   */

  FacebookAuth(){
    this.AuthFaceLogin(new FacebookAuthProvider());
  }
  AuthFaceLogin(provider: any){
    return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {

    

      this.messageService.add({
        severity:'success', 
        summary:'Success Message :-)', 
        detail:'Nice you login Successfully'});
        // this.router.navigate(['/dashboard'])
        setTimeout(() => {this.router.navigateByUrl('/dashboard') }, 1000)
      console.log("You have Login successfully")

    }).catch((error)=> {

      this.messageService.add({
        severity:'error',
        summary: 'LOGIN FAILD :-(',
        detail: 'Sorry they may be an error check you data connection'
        });
      console.log(error)

    })
  }

  sendVerificationMail(){
    return this.afAuth.currentUser.then((u: any)=> u.sendEmailVerification()).then(()=>{
      console.log("Email Send to User");
    })
  }

  /**
   * @Description
   * Save user details in localstorage
   */

   loadUsers(){
    return this.afs.collection('users').snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    )
  }

 

}
