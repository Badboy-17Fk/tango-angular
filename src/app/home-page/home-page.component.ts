import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationServiceService } from '../services/notification-service.service';
import { LoanServiceService } from '../services/loan-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  // items$: chartModal[];
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  totalCount!: number;
  notifyMe!: any;
  totalLoans!: number;
  userCount!: number;
  productCount!: number;
  

  constructor(private afs: AngularFirestore, private notification: NotificationServiceService) { }

  ngOnInit(): void {


    const dataArray = this.afs.collection('productDetails_db').snapshotChanges();

    dataArray.subscribe(payload => {
       this.productCount = payload.length;
        
    })

    const loanArray = this.afs.collection('all-loans').snapshotChanges();

    loanArray.subscribe(payload => {
      this.totalCount = payload.length;
    })

    const loadUsers = this.afs.collection('users').snapshotChanges();

    loadUsers.subscribe(payload => {
      this.userCount = payload.length;
    })

   




    this.getChart();
  }

  getChart() {
    this.chartOptions = {
      series: [{
        name: 'Sales',
        data: [5268, 635, 1809, 947, 402, 3634, 502]
    }, {
        name: 'loans',
        data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
        name: 'products',
        data: [163, 203, 276, 408, 547, 729, 628]
    }, {
        name: 'Daily-sales',
        data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
        name: '0',
        data: [2, 2, 2, 6, 13, 30, 46]
    }],
      chart: {
        type: "area",
      },
      title: {
        text: "Stock Statistics",
      },subtitle: {
        text: 'BY: @soh-Tagne-Achille'
    },  xAxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },  plotOptions: {
    area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
            lineWidth: 1,
            lineColor: '#666666'
        }
    }
},  tooltip: {
  split: true,
  valueSuffix: ' FCFA'
},
      
    };
  }

  chart(){

    
    
  }

}
