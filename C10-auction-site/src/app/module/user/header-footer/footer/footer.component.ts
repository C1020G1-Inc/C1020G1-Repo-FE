import { Component, OnInit } from '@angular/core';
import {FirebaseDatabaseService} from '../../../../service/auction-bidding/firebase-database.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
