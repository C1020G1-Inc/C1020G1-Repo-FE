import {Component, OnInit} from '@angular/core';
import {Color} from "ng2-charts";
import {ProductService} from "../../../../service/product.service";
import {Product} from "../../../../model/product/product";
import {ProductStatus} from "../../../../model/ProductStatus";
import {Category} from "../../../../model/Category";

@Component({
  selector: 'app-product-chart-donut',
  templateUrl: './product-chart-donut.component.html',
  styleUrls: ['./product-chart-donut.component.css']
})
export class ProductChartDonutComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

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
  public barChartType = 'doughnut';
  public barChartLegend = true;
  public dataStatistic = new Array<number>();

  public lineChartColor: Color[] = [
    {
      backgroundColor: ['rgb(199,107,255)', 'rgb(255,142,9)', 'rgb(80,150,255)', 'rgb(255,6,6)'],
    }
  ];

  barChartData = [
    {data: [], label: ''}
  ];

  public daySearch = 0;
  public monthSearch = 0;
  public yearSearch;
  public message;
  private productCategoryList = new Array<Category>();

  ngOnInit(): void {
    this.productService.getAllCategory().subscribe(data => {
      this.productCategoryList = data;
      this.getDefaultChart(this.productCategoryList);
    })
  }


  getDefaultChart(productCategoryList) {
    this.yearSearch = new Date().getFullYear();
    this.productService.getProductByDate(0, this.yearSearch).subscribe(data => {
      if (data.length === 0) {
        this.message = 2;
      }
      // tslint:disable-next-line:prefer-const
      let listProduct: Product[] = data;
      this.barChartLabels = new Array<string>();
      this.dataStatistic = new Array<number>();
      for (let i = 0; i < productCategoryList.length; i++) {
        this.barChartLabels.push(productCategoryList[i].categoryName);
        let count = 0;
        for (let j = 0; j < listProduct.length; j++) {
          if (productCategoryList[i].id === listProduct[j].category.id) {
            count++;
          }
        }
        this.dataStatistic.push(count);
      }
      this.barChartData = [
        {data: this.dataStatistic, label: ''}
      ];
    });
  }

  getChartByDate() {
    if (this.daySearch === undefined && this.yearSearch === undefined && this.monthSearch === undefined) {
      this.message = 1;
    } else if (this.monthSearch != undefined && this.yearSearch === undefined) {
      this.message = 1;
    } else if (this.daySearch != undefined && (this.monthSearch === undefined || this.yearSearch === undefined)) {
      this.message = 1;
    } else {
      this.productService.getProductByDateForDonut(this.daySearch,this.monthSearch, this.yearSearch).subscribe(data => {
        if (data.length === 0) {
          this.message = 2;
        } else {
          // tslint:disable-next-line:prefer-const
          let listProduct: Product[] = data;
          this.barChartLabels = new Array<string>();
          this.dataStatistic = new Array<number>();
          for (let i = 0; i < this.productCategoryList.length; i++) {
            this.barChartLabels.push(this.productCategoryList[i].categoryName);
            let count = 0;
            for (let j = 0; j < listProduct.length; j++) {
              if (this.productCategoryList[i].id === listProduct[j].category.id) {
                count++;
              }
            }
            this.dataStatistic.push(count);
          }
          this.barChartData = [
            {data: this.dataStatistic, label: ''}
          ];
          this.message = 0;
        }
      });
    }
  }
}
