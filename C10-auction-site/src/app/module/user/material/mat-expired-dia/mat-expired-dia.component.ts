import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-expired-dia',
  templateUrl: './mat-expired-dia.component.html',
  styleUrls: ['./mat-expired-dia.component.css']
})
export class MatExpiredDiaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  reload() {
    window.location.reload();
  }
}
