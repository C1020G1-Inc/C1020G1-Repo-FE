import {Component, OnInit} from '@angular/core';
import {Color} from 'ng2-charts';
import {UserService} from '../../../../service/user.service';
import {Account} from "../../../../model/account";

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    beginAtZero: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1
        }
      }]
    },
    legend: {
      display: true,
      labels: {
        fontSize: 17,
        fontColor: 'white',
      }
    }
  };
  public barChartLabels = new Array<string>();
  public barChartType = 'line';
  public barChartLegend = true;
  public dataStatistic = new Array<number>();
  public lineChartColor: Color[] = [
    {
      borderWidth: 1,
      borderColor: 'rgb(255,255,255)',
      backgroundColor: 'rgb(255,127,49)'
    }
  ];
  barChartData = [
    {data: [], label: 'Số lượng thành viên'},
];
  public month;
  public year;
  public message;
  public checkButton;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getDefaultChart();
  }

  getDefaultChart() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    this.userService.getUserByDate(month, year).subscribe(data => {
      // tslint:disable-next-line:prefer-const
      let listUser: Account[] = data;
      for (let i = 1; i < 32; i++) {
        // Sử dụng "i" để lấy 31 ngày của trục ngang và check số lượng sản phẩm từng ngày
        this.barChartLabels.push(i.toString());
        let count = 0;

        // Vòng lặp danh sách sản phẩm để tính sản phẩm theo từng ngày
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < listUser.length; j++) {
          const date: Date = new Date(listUser[j].logoutTime);
          if (date.getDate() === i) {
            count++;
          }
        }
        this.dataStatistic.push(count);
      }
      this.barChartData = [
        {data: this.dataStatistic, label: 'Số lượng thành viên'}
      ];
    });
  }

  getChartByMonth() {
    if (this.month === undefined || this.year === undefined) {
      this.message = 1;
    } else {
      this.userService.getUserByDate(this.month, this.year).subscribe(data => {
        if (data.length === 0) {
          this.message = 2;
        } else {
          // tslint:disable-next-line:prefer-const
          let listUser: Account[] = data;
          this.barChartLabels = new Array<string>();
          this.dataStatistic = new Array<number>();
          for (let i = 1; i < 32; i++) {
            // Sử dụng "i" để lấy 31 ngày của trục ngang và check số lượng sản phẩm từng ngày
            this.barChartLabels.push(i.toString());
            let count = 0;
            // Vòng lặp danh sách sản phẩm để tính sản phẩm theo từng ngày
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < listUser.length; j++) {
              const date: Date = new Date(listUser[j].logoutTime);
              if (date.getDate() === i) {
                count++;
              }
            }
            this.dataStatistic.push(count);
          }
          this.barChartData = [
            {data: this.dataStatistic, label: 'Số lượng thành viên'}
          ];
          this.message = 0;
        }
      });
    }
  }

  getChartByYear() {
    this.month = 0;
    if (this.year === undefined) {
      this.message = 1;
    } else {
      this.userService.getUserByDate(this.month, this.year).subscribe(data => {
        if (data.length === 0) {
          this.message = 2;
        } else {
          // tslint:disable-next-line:prefer-const
          let listUser: Account[] = data;
          this.barChartLabels = new Array<string>();
          this.dataStatistic = new Array<number>();
          for (let i = 1; i < 13; i++) {
            // Sử dụng "i" để lấy 31 ngày của trục ngang và check số lượng sản phẩm từng ngày
            this.barChartLabels.push(i.toString());
            let count = 0;
            // Vòng lặp danh sách sản phẩm để tính sản phẩm theo từng ngày
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < listUser.length; j++) {
              const date: Date = new Date(listUser[j].logoutTime);
              if (date.getMonth() === (i - 1)) {
                count++;
              }
            }
            this.dataStatistic.push(count);
          }
          this.barChartData = [
            {data: this.dataStatistic, label: 'Số lượng thành viên'}
          ];
          this.message = 0;
        }
      });
    }
  }
}
