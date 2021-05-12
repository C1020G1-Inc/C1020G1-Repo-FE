import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfMake from 'html-to-pdfmake';
import * as html2pdf from 'html2pdf.js';
import {Element} from '@angular/compiler';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  // title = 'htmlToPdf';
  // @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  public downloadAsPDF() {
    const options = {
      fileName: '123',
      margin: [0, 0, 0, 0],
      image: {type: 'jpeg'},
      html2canvas: {
        height: 2000
      },
      jsPDF: {
        x: 0,
        y: 0,
        orientation: 'portrait'
      },
      format: 'a4',
    };

    const content: HTMLElement = document.getElementById('pdfTable');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }
}
