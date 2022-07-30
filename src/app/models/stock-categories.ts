import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

export interface StockCategories {
    
    stockName: string;
    stockNumber: number;
    stockDescription: string;
    stockDate: Timestamp
    createdAt: Date;

}
