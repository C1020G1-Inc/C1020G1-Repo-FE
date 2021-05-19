import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../service/product.service';
import {Color} from 'ng2-charts';
import {stringify} from 'querystring';
import {Product} from '../../../../model/product/product';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
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
      borderColor: 'rgba(255,255,255,0.6)',
      backgroundColor: 'rgba(255,255,255,0.38)'
    }
  ];

  barChartData = [
    {data: [] , label: 'Số lượng sản phẩm'}
  ];

  public monthSearch;
  public yearSearch;
  public message;
  public checkButton: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getDefaultChart();
  }


  getDefaultChart() {
    const yearSearch = new Date().getFullYear();
    this.productService.getProductByDate(0, yearSearch).subscribe(data => {
      if (data.length === 0){
        this.message = 2;
      }
      // tslint:disable-next-line:prefer-const
      let listProduct: Product[] = data;
      this.barChartLabels = new Array<string>();
      this.dataStatistic = new Array<number>();
      for (let i = 1; i < 13; i++) {
        // Sử dụng "i" để lấy 12 tháng của trục ngang và check số lượng sản phẩm từng tháng
        this.barChartLabels.push(i.toString());
        let count = 0;
        // Vòng lặp danh sách sản phẩm để tính sản phẩm theo từng tháng
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < listProduct.length; j++) {
          const date: Date = new Date(listProduct[j].endTime);
          if (date.getMonth() === (i - 1) ){
            count++;
          }
        }
        this.dataStatistic.push(count);
      }
      this.barChartData = [
        {data: this.dataStatistic , label: 'Số lượng sản phẩm'}
      ];
    });
  }

  getChartByMonth() {
    if (this.monthSearch === undefined || this.yearSearch === undefined) {
      this.message = 1;
    } else {
      this.productService.getProductByDate(this.monthSearch, this.yearSearch).subscribe(data => {
        if (data.length === 0){
          this.message = 2;
        }
        else {
          // tslint:disable-next-line:prefer-const
          let listProduct: Product[] = data;
          this.barChartLabels = new Array<string>();
          this.dataStatistic = new Array<number>();
          for (let i = 1; i < 32; i++) {
            // Sử dụng "i" để lấy 31 ngày của trục ngang và check số lượng sản phẩm từng ngày
            this.barChartLabels.push(i.toString());
            let count = 0;
            // Vòng lặp danh sách sản phẩm để tính sản phẩm theo từng ngày
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < listProduct.length; j++) {
              const date: Date = new Date(listProduct[j].endTime);
              if (date.getDate() === i) {
                count++;
              }
            }
            this.dataStatistic.push(count);
          }
          this.barChartData = [
            {data: this.dataStatistic, label: 'Số lượng sản phẩm'}
          ];
          this.message = 0;
        }
      });
    }
  }

  getChartByYear() {
    this.monthSearch = 0;
    if (this.yearSearch === undefined) {
      this.message = 1;
    } else {
      this.productService.getProductByDate(this.monthSearch, this.yearSearch).subscribe(data => {
        if (data.length === 0){
          this.message = 2;
        }
        else {
          // tslint:disable-next-line:prefer-const
          let listProduct: Product[] = data;
          this.barChartLabels = new Array<string>();
          this.dataStatistic = new Array<number>();
          for (let i = 1; i < 13; i++) {
            // Sử dụng "i" để lấy 12 tháng của trục ngang và check số lượng sản phẩm từng tháng
            this.barChartLabels.push(i.toString());
            let count = 0;
            // Vòng lặp danh sách sản phẩm để tính sản phẩm theo từng tháng
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < listProduct.length; j++) {
              const date: Date = new Date(listProduct[j].endTime);
              if (date.getMonth() === (i - 1) ){
                count++;
              }
            }
            this.dataStatistic.push(count);
          }
          this.barChartData = [
            {data: this.dataStatistic, label: 'Số lượng sản phẩm'}
          ];
          this.message = 0;
        }
      });
    }
  }
}
