import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../../model/Account';
import {Product} from '../../../../model/Product';
import {District, Province, Ward} from '../../../../model/Address';
import {AddressService} from '../../../../service/address.service';
import {OrderDTO} from '../../../../model/OrderDTO';
import {OrderService} from '../../../../service/order.service';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';

declare var paypal;

@Component({
  selector: 'app-auction-payment',
  templateUrl: './auction-payment.component.html',
  styleUrls: ['./auction-payment.component.css']
})
export class AuctionPaymentComponent implements OnInit {
  products: Product[];
  account: Account;
  totalInVND: number;
  totalInUSD: string;
  paymentForm: FormGroup;
  provinces: Array<Province>;
  districts: Array<District>;
  wards: Array<Ward>;
  messagePayment: string;
  isChecked1 = true;
  isChecked2 = false;
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;
  // for loading process
  @ViewChild('ngxLoading', { static: false }) ngxLoadingComponent: NgxLoadingComponent;
  loading = false;

  constructor(private addressService: AddressService,
              private orderService: OrderService) {
    this.account = {
      accountId: 1,
      accountName: 'leechoncaao',
      password: '12345',
      email: 'lephuocthanhcao@gmail.com',
      enable: true,
      logoutTime: null,
      user: {
        userId: 1,
        userName: 'Lê Phước Thanh Cao',
        birthday: '1996-12-12T17:00:00.000+00:00',
        phone: '0777542581',
        identity: '1321322312',
        avatar: '',
        address: '41b Mai Lão Bạng'
      }
    };
    this.totalInVND = 10000000;
    this.totalInUSD = (this.totalInVND / 22000).toFixed(2);
    this.products = [
      {
        productId: 1,
        productName: 'Iphone 12',
        price: 2.0E7,
        category: {
          id: 2,
          categoryName: 'smartphone'
        },
        priceStep: 200000.0,
        serviceFee: 20000.0,
        quantity: 2,
        lastPrice: 2.5E7,
        description: 'This is Iphone 12',
        productStatus: {
          id: 3,
          statusName: 'purchasing'
        },
        registerTime: null,
        auctionTime: null,
        endTime: null,
        account: {
          accountId: 2,
          accountName: 'paintc',
          password: '12345',
          email: 'paintc@gmail.com',
          enable: true,
          logoutTime: null,
          user: {
            userId: 2,
            userName: 'Pain TC',
            birthday: '1996-12-12T17:00:00.000+00:00',
            phone: '0777542581',
            identity: '1321322312',
            avatar: null,
            address: '123 Đống Đa'
          }
        }
      },
      {
        productId: 2,
        productName: 'Air Cleaner',
        price: 8000000.0,
        category: {
          id: 3,
          categoryName: 'electronic'
        },
        priceStep: 100000.0,
        serviceFee: 15000.0,
        quantity: 1,
        lastPrice: 9000000.0,
        description: 'This is Air Cleaner',
        productStatus: {
          id: 3,
          statusName: 'purchasing'
        },
        registerTime: null,
        auctionTime: null,
        endTime: null,
        account: {
          accountId: 2,
          accountName: 'paintc',
          password: '12345',
          email: 'paintc@gmail.com',
          enable: true,
          logoutTime: null,
          user: {
            userId: 2,
            userName: 'Pain TC',
            birthday: '1996-12-12T17:00:00.000+00:00',
            phone: '0777542581',
            identity: '1321322312',
            avatar: null,
            address: '123 Đống Đa'
          }
        }
      }];

    this.addressService.getAllProvinces().subscribe(data => {
      this.provinces = data;
    });
  }

  ngOnInit(): void {
    this.messagePayment = null;
    this.paymentForm = new FormGroup({
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.pattern('(^(0)\\d{9}$)')]),
      guide: new FormControl(null),
      total: new FormControl(this.totalInVND),
      methodPay: new FormControl('0'),
      userName: new FormControl({value: this.account.user.userName, disabled: true}),
      userEmail: new FormControl({value: this.account.email, disabled: true}),
      ward: new FormControl(null, Validators.required)
    });

    this.onPay();
  }

  onPay() {
    paypal.Buttons({
      createOrder: (data, actions) => {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalInUSD
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        this.loading = true;
        // This function captures the funds from the transaction.
        return actions.order.capture().then((details) => {
          // This function shows a transaction success message to your buyer.
          this.messagePayment = 'Thanh toán thành công !';
          this.loading = false;
        });
      }
    }).render(this.paypalElement.nativeElement);
  }

  submit() {
    // tslint:disable-next-line:prefer-const
    let orderDTO = new OrderDTO();
    orderDTO.order = this.paymentForm.value;
    orderDTO.order.account = this.account;
    orderDTO.order.userName = this.account.user.userName;
    orderDTO.order.userEmail = this.account.email;
    orderDTO.products = this.products;

    console.log(this.paymentForm.value);
    console.log(orderDTO);

    this.orderService.createOrder(orderDTO).subscribe(data => {
      console.log(data);
    });
  }

  changeDistrict(event) {
    const provinceId: number = event.target.value;
    this.addressService.getDistrictByProvince(provinceId).subscribe(data => {
      this.districts = data;
    });
  }

  changeWard(event) {
    const districtId: number = event.target.value;
    this.addressService.getWardByDistrict(districtId).subscribe(data => {
      this.wards = data;
    });
  }

  onCheck2() {
    this.isChecked1 = false;
    this.isChecked2 = true;
  }

  onCheck1() {
    this.isChecked1 = true;
    this.isChecked2 = false;
  }
}
