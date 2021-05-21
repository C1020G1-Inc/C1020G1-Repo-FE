import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../../service/request.service';
import {Router} from '@angular/router';
import {Category} from "../../../../model/product/category";
import {TokenStorageService} from "../../../../service/authentication/token-storage";
import {Account} from "../../../../model/account";
import {Product} from "../../../../model/Product";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {ProductImage} from "../../../../model/product/product_image";
import {ProductDTO} from '../../../../model/ProductDTO';
import {MatDialog} from '@angular/material/dialog';
import {LoadingComponent} from '../../../loading/loading/loading.component';
import Swal from 'sweetalert2';
import {ZoomComponent} from '../../../admin/admin-chat/zoom/zoom.component';




@Component({
  selector: 'app-auction-request',
  templateUrl: './auction-request.component.html',
  styleUrls: ['./auction-request.component.css']
})
export class AuctionRequestComponent implements OnInit {
  createProduct: FormGroup;
  categories = new Array<Category>();
  newProduct: Product;
  account: Account;
  category: Category;
  lengthOfImage = 0;
  message = 0;
  // Ảnh mới dùng để show màn hình
  productImage = new Array<any>();
  // file ảnh mới dùng để up lên firebase.
  imageToUpFireBase = new Array<any>();
  // file ảnh mới dùng để lưu database.
  imageToSave = new Array<any>();
  price: any;
  priceStep: any;
  constructor(
    private createService: RequestService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private storage: AngularFireStorage,
    private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.getCategory();
    this.createProduct = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(70)]],
      category: [0, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required , Validators.min(10000) , Validators.pattern(/^[0-9]+$/)]],
      priceStep: ['', [Validators.required , Validators.min(1000) , Validators.pattern(/^[0-9]+$/)]],
      auctionTime: [0, [Validators.min(1)]],
      quantity: ['', [Validators.required , Validators.min(1) , , Validators.pattern(/^[0-9]+$/)]],
      description: ['', [Validators.required, Validators.minLength(6) , Validators.maxLength(100)]],
    });
    this.account = this.tokenStorageService.getAccount();
  }
  getCategory() {
    this.createService.getCategory().subscribe(category => {
      this.categories = category;
    });
  }
  async submitForm() {
    if (this.lengthOfImage == 0){
      this.message = 1;
      return;
    }
    this.openLoading();
    this.newProduct = this.createProduct.value;
    this.newProduct.account = this.account;
    await this.addImageToFireBase();
    console.log(this.imageToSave);
    const productDTO: ProductDTO = {
      product: this.newProduct,
      productImageList: this.imageToSave
    }
    this.createService.createProduct(productDTO).subscribe();
    this.createProduct.reset();
    this.productImage = new Array<any>();
  }

  openLoading() {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
    setTimeout(() => {
      this.dialog.closeAll();
      this.showSuccessAlert();
    }, 2000);
  }

  showSuccessAlert() {
    Swal.fire('Đăng Sản Phẩm Thành Công', '', 'success')
  }

  selectFile(event) {
    this.message = 0;
    if (this.lengthOfImage < 5) {
      let files = event.target.files;
      if (files) {
        for (let file of files) {
          const name = file.type;
          const size = file.size;
          if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
            if (size <= 1000000) {
              let reader = new FileReader();
              reader.onload = (e: any) => {
                this.productImage.push({url: e.target.result, fileToShow: file});
                this.imageToUpFireBase.push(file);
                this.lengthOfImage++;
              };
              reader.readAsDataURL(file);
            } else {
              alert('Ảnh không được quá 1Mb');
            }
          } else {
            alert('Vui lòng chỉ chọn file ảnh');
          }
        }
      }
    }
    console.log(this.productImage);
  }
  addImageToFireBase() {
    return new Promise(resolve => {
      Promise.all(this.imageToUpFireBase.map(file =>
        new Promise(resolve => {
          const name = file.name;
          if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
            const fileRef = this.storage.ref('images/' + name);
            const task = fileRef.put(file);
            task.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL()
                  .subscribe((url) => {
                    const productImage: ProductImage = {
                      product: null,
                      image: url
                    };
                    this.imageToSave.push(productImage);
                    resolve(1);
                  });
              })).subscribe();
          }
        }))).then(() => {
        resolve(1);
      });
    });
  }
  deleteImage(event) {
    if (this.productImage.length === 1) {
      this.productImage = new Array<any>();
      $('#clear').val('');
      return;
    }
    let index = event.target.attributes['data-index'].value;
    this.productImage.splice(index, 1);
    this.imageToUpFireBase.splice(index, 1);
    this.lengthOfImage--;
  }

  zoom(url) {
    this.dialog.open(ZoomComponent,{
      data: url,
      panelClass: 'custom-modalbox'
    });
  }
}
