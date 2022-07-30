import  firebase from 'firebase/compat/app'

import Timestamp = firebase.firestore.Timestamp;


export interface LoansModel {

    borrowerName: string;
    priceBorrow: number;
    quantityBorrow: number;
    dateBorrow: Timestamp;
    refundDate: Timestamp;
    contact: number;
    status: string;
    createdAt:Date;
    
}
