import { Component, OnInit } from '@angular/core';
import { LoanServiceService } from 'src/app/services/loan-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {LOANS_STATUS} from 'src/app/models/status.constant'

@Component({
  selector: 'app-loans-details',
  templateUrl: './loans-details.component.html',
  styleUrls: ['./loans-details.component.scss']
})
export class LoansDetailsComponent implements OnInit {


  loansDetails!:Array<any>
  changeStatus = LOANS_STATUS;

  constructor(private loansService: LoanServiceService) { }

  ngOnInit(): void {
    this.loansService.loadAllLoands().subscribe(loansreport => {
      console.log(loansreport);
      this.loansDetails = loansreport
    })
  }

  

  public LoansPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('tango-stock-report.pdf');
    });
  }

}
