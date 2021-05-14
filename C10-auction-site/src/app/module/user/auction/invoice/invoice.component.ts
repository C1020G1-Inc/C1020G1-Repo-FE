import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfMake from 'html-to-pdfmake';
import * as html2pdf from 'html2pdf.js';
import {Element} from '@angular/compiler';
import jsPDFInvoiceTemplate from 'jspdf-invoice-template';
import {style} from '@angular/animations';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  id;
  code;
  name;
  price;
  quantity;
  total;
  product1: Product;
  product2: Product;
  arr = [];

  constructor() {

  }

  ngOnInit(): void {
    this.id = [1, 2];
    this.code = [1, 2];
    this.name = ['Máy tính xách tay', 'Máy tính để bàn'];
    this.price = [1000000, 2000000];
    this.quantity = [1, 3];
    this.total = [1000000, 6000000];
    this.product1 = new Product(1,1,'abc',1000000,1,1000000);
    this.product2 = new Product(2,2,'def',2000000,2,4000000);
  }

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open':
        pdfMake.createPdf(documentDefinition).open();
        break;
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;
      case 'download':
        pdfMake.createPdf(documentDefinition).download();
        break;
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  public getDocumentDefinition() {
    // sessionStorage.setItem('resume', JSON.stringify(this.resume));
    // <br> ​
    return {
      content: [
        {
          text: 'Hóa đơn sản phẩm',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 'auto'],
            body:
              [
                [
                  {
                    border: [false, false, false, true],
                    columns:
                      [
                        [
                          {
                            text: 'Công ty đấu giá trực tuyến C1020G1 Auction',
                            style: 'name'
                          },
                          {
                            text: 'Địa chỉ: Số 295 - Đường Nguyễn Tất Thành'
                          },
                          {
                            text: 'Quận Hải Châu'
                          },
                          {
                            text: 'Thành phố Đà Nẵng'
                          },
                          {
                            text: 'Số điện thoại: +84356109145'
                          }
                        ]
                      ]
                  },
                  {
                    border: [false, false, false, true],
                    image: 'data:image/png;base64,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',
                    width: 100,
                    alignment: 'right'
                  }
                ],
              ]
          }
        },
        {
          text: 'Thông tin khách hàng:',
          style: 'name',
          margin: [0, 5, 0, 5]
        },
        {
          fillColor: '#f5deb3',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  border: [false, false, false, false],
                  columns:
                    [
                      [
                        {
                          text: 'Trần Hữu Kiên',
                          style: 'name'
                        },
                        {
                          text: 'Địa chỉ: Số 463, đường Hải Phòng'
                        },
                        {
                          text: 'Phường/Xã: abc'
                        },
                        {
                          text: 'Quận/Huyện: Thanh Khê'
                        },
                        {
                          text: 'Tỉnh/Thành phố: Tp Đà Nẵng'
                        },
                        {
                          text: 'Số điện thoại: +84356109145',
                        }
                      ]
                    ]
                }
              ]
            ]
          }
        },
        {
          text: 'Thông tin đơn hàng:',
          style: 'name',
          margin: [0, 5, 0, 5]
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: 'Phương thức thanh toán:',
                  style: 'name',
                  border: [false, true, false, false]
                },
                {
                  text: 'Phương thức giao hàng:',
                  style: 'name',
                  border: [false, true, false, false]
                }
              ],
              [
                {
                  text: 'Chuyển khoản ngân hàng Vietcombank',
                  // color: '#ff8500',
                  border: [false, false, false, true]
                },
                {
                  text: 'Giao hàng tiết kiệm',
                  // color: '#ff8500',
                  border: [false, false, false, true]
                }
              ]
            ]
          }
        },
        {
          text: 'Thông tin sản phẩm:',
          style: 'name',
          margin: [0, 5, 0, 5]
        },
        this.getProduct(),
        // {
        //   table: {
        //     widths: ['*', '*', '*'],
        //     body: [
        //       [
        //         {
        //           text: 'Người mua hàng',
        //           style: 'header',
        //           alignment: 'center'
        //         },
        //         {},
        //         {
        //           text: 'Người bán hàng',
        //           style: 'header',
        //           alignment: 'center'
        //         }
        //       ],
        //       [
        //         {
        //           text: ''
        //         }
        //       ]
        //     ]
        //   },
        //   margin: [0, 10, 0, 0],
        //   layout: 'noBorders'
        // }
        {
          margin: [0, 10, 0, 0],
          table: {
            widths: ['auto', '*'],
            body: [
              [
                {
                  border: [true, true, true, true],
                  image: 'data:image/png;base64,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',
                  width: 75,
                  alignment: 'left'
                },
                {
                  alignment: 'justify',
                  columns: [
                    [
                      {
                        text: ' Nếu bạn gặp vấn đề về thanh toán hoặc muốn kết hợp nhiều đơn hàng, vui lòng gửi hóa đơn cùng mã đơn hàng tới:'
                      },
                      {
                        margin: [0, 13, 0, 0],
                        text: [
                          {
                            text: 'Email:',
                            bold: true
                          },
                          ' support.auctionc1020g1@info.com'
                        ]
                      },
                      {
                        text: [
                          {
                            text: 'Facebook:',
                            bold: true
                          },
                          ' support.auction.c1020g1'
                        ]
                      },
                    ]
                  ]
                }
              ]
            ]
          }
        }
      ],
      styles: {
        name: {
          fontSize: 15,
          bold: true
        },
        header: {
          fontSize: 13,
          bold: true,
          margin: [0, 2, 0, 2]
        }
      }
    };
  }

  public getProduct() {
    console.log(this.product1);
    console.log(this.product2);
    this.arr = [];
    this.arr.push(this.id[0]);
    this.arr.push(this.id[1]);
    return {
      table: {
        widths: ['auto', 'auto', '*', 'auto', 'auto', 'auto'],
        body: [
          [
            {
              text: 'STT',
              style: 'header',
              alignment: 'center'
            },
            {
              text: 'Mã sản phẩm',
              style: 'header',
              alignment: 'center'
            },
            {
              text: 'Tên sản phẩm',
              style: 'header',
              alignment: 'center'
            },
            {
              text: 'Số lượng',
              style: 'header',
              alignment: 'center'
            },
            {
              text: 'Giá',
              style: 'header',
              alignment: 'center'
            },
            {
              text: 'Tổng giá',
              style: 'header',
              alignment: 'center'
            },
          ],
          ...this.arr.map(arr => {
            return [
              {
                text: arr,
                alignment: 'center'
              },
              {
                text: this.code[arr - 1],
                alignment: 'center'
              },
              {
                text: this.name[arr - 1]
              },
              {
                text: this.quantity[arr - 1],
                alignment: 'center'
              },
              {
                text: this.price[arr - 1],
                alignment: 'center'
              },
              {
                text: this.total[arr - 1],
                alignment: 'center'
              }
            ];
          }),
          [
            {
              text: 'Tổng giá trước thuế',
              colSpan: 5,
              alignment: 'center',
              style: 'name'
            },
            {}, {}, {}, {},
            {
              text: this.total[0],
              alignment: 'center'
            }
          ],
          [
            {
              text: 'Thuế (10%)',
              colSpan: 5,
              alignment: 'center',
              style: 'name'
            },
            {}, {}, {}, {},
            {
              text: this.total[0],
              alignment: 'center'
            }
          ],
          [
            {
              text: 'Phí giao hàng',
              colSpan: 5,
              alignment: 'center',
              style: 'name'
            },
            {}, {}, {}, {},
            {
              text: this.total[0],
              alignment: 'center'
            }
          ],
          [
            {
              text: 'Tổng tiền',
              colSpan: 5,
              alignment: 'center',
              style: 'name'
            },
            {}, {}, {}, {},
            {
              text: this.total[0],
              alignment: 'center'
            }
          ]
        ]
      }
    };
  }
}

export class Product {
  id: number;
  code: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  constructor(id, code, name, price, quantity, total) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.total = total;
  }
}
