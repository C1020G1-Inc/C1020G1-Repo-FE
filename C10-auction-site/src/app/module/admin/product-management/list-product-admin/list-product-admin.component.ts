import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product/product';
import {ProductService} from '../../../../service/product.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../../model/product/category';
import {ProductImage} from '../../../../model/product/product_image';
import {ProductDto} from '../../../../model/product/product_dto';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {LoadingComponent} from '../loading/loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product-admin',
  templateUrl: './list-product-admin.component.html',
  styleUrls: ['./list-product-admin.component.css']
})
export class ListProductAdminComponent implements OnInit {

  productList = new Array<Product>();
  product: Product;
  productDTO: ProductDto;
  downloadURL: Observable<string>;
  page;

  // Biến dành cho search
  productName: string;
  userName: string;
  productStatusId = 0;
  categoryId = 0;

  // Biến dành cho edit
  productEdit: Product;
  categoryList = new Array<Category>();
  statusChange = {
    1: 'Chờ Duyệt',
    2: 'Đang Đấu Giá',
    3: 'Chờ Thanh Toán',
    4: 'Hoàn Thành',
  };
  editForm: FormGroup;
  // Ảnh có sẵn dùng để show màn hình
  listProductImage = new Array<ProductImage>();
  // Ảnh có sẵn dùng để update
  listProductImageUpdate = new Array<ProductImage>();
  // Ảnh update dùng để show màn hình
  productImageUpdate = new Array<any>();
  // file ảnh update dùng để up lên firebase.
  imageToUpFireBase = new Array<any>();
  lengthOfImage;
  notification;

  // Biến dành cho confirm
  productConfirm: Product;
  accountEmailConfirm: string;
  confirmContent: string;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.productService.getAllCategory().subscribe(data => {
      this.categoryList = data;
    });
    this.editForm = this.formBuilder.group({
      productId: [''],
      productName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(70)]],
      category: ['', [Validators.required]],
      price: [''],
      priceStep: [''],
      account: [''],
      productStatus: [''],
      auctionTime: [''],
      quantity: ['', [Validators.required]],
      description: [''],
    });
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(data => {
      this.productList = data;
      console.log(data);
    });
  }

  approveProduct() {
    this.productService.approvedProduct(this.product.productId).subscribe(data => this.ngOnInit());
  }

  sendProductIdForApprove(productId: number) {
    this.productService.getProductById(productId).subscribe(data => {
      this.productDTO = data;
      this.product = this.productDTO.product;
      this.listProductImage = this.productDTO.productImageList;
    });
  }

  doSearch() {
    this.productService.getProductBySearch(this.productName,
      this.categoryId, this.userName, this.productStatusId).subscribe(data => {
      this.productList = data;
    });
  }

  sendProductIdForForm(productId: number) {
    this.lengthOfImage = 0;
    this.listProductImage = new Array<any>();
    this.productImageUpdate = new Array<any>();
    this.imageToUpFireBase = new Array<any>();
    this.productService.getProductById(productId).subscribe(data => {
      this.productDTO = data;
      this.productEdit = this.productDTO.product;
      this.listProductImage = this.productDTO.productImageList;
      this.lengthOfImage = this.listProductImage.length;

      this.editForm.controls.productId.setValue(this.productEdit.productId);
      this.editForm.controls.productName.setValue(this.productEdit.productName);
      this.editForm.controls.category.setValue(this.productEdit.category.id);
      this.editForm.controls.price.setValue(this.productEdit.price);
      this.editForm.controls.priceStep.setValue(this.productEdit.priceStep);
      this.editForm.controls.account.setValue(this.productEdit.account);
      this.editForm.controls.auctionTime.setValue(this.productEdit.auctionTime);
      this.editForm.controls.productStatus.setValue(this.productEdit.productStatus);
      this.editForm.controls.quantity.setValue(this.productEdit.quantity);
      this.editForm.controls.description.setValue(this.productEdit.description);
    });
  }


  async updateProduct() {
    document.getElementById('close').click();
    this.openLoading();
    const productUpdate: Product = this.editForm.value;
    await this.addImageToFireBase(productUpdate);


    this.productService.getCategoryById(productUpdate.category).subscribe(data => {
      productUpdate.category = data;
      const productDTO: ProductDto = {
        product: productUpdate,
        productImageList: this.listProductImage
      };

      this.productService.updateProduct(productDTO).subscribe(data2 => {
        this.ngOnInit();
      });
    });
    const confirmContent = "Chúng tôi đã có chỉnh sửa 1 số thông tin sản phẩm của bạn , vui lòng kiểm tra lại !!!"
    this.productService.sendConfirm(this.productEdit.account.email, confirmContent,
      this.productEdit.account.user.userName).subscribe()
  }

  deleteImage(i: number) {
    this.listProductImage.splice(i, 1);
    this.lengthOfImage--;
  }

  selectFile(event) {
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
                this.productImageUpdate.push({url: e.target.result, fileToShow: file});
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
  }

  deleteUpdateImage(event) {
    let index = event.target.attributes['data-index'].value;
    this.productImageUpdate.splice(index, 1);
    this.imageToUpFireBase.splice(index, 1);
    this.lengthOfImage--;
  }

  addImageToFireBase(productUpdate) {
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
                      product: productUpdate,
                      image: url
                    };
                    this.listProductImage.push(productImage);
                    resolve(1);
                  });
              })).subscribe();
          }
        }))).then(() => {
        resolve(1);
      });
    });
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
    }, 3000);
  }

  showSuccessAlert() {
    Swal.fire('Chỉnh sửa thành công!', '', 'success')
  }

  sendProductToConfirm(product: Product) {
    this.confirmContent = '';
    this.productConfirm = product;
  }

  sendConfirm() {

    this.openLoadingSendConFirm();

    const accountEmail = this.productConfirm.account.email;
    const confirmContent = this.confirmContent;
    const userName = this.productConfirm.account.user.userName;

    this.productService.sendConfirm(accountEmail, confirmContent, userName).subscribe()
  }

  openLoadingSendConFirm() {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
    setTimeout(() => {
      this.dialog.closeAll();
      this.showSendMailAlert();
    }, 3000);
  }

  showSendMailAlert() {
    Swal.fire('Gửi mail phản hồi thành công !', '', 'success')
  }
}

