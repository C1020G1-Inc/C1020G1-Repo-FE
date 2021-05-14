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

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.productService.getAllCategory().subscribe(data => this.categoryList = data);
    this.editForm = this.formBuilder.group({
      productId: [''],
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
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
      console.log(this.productDTO);

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
  }

  deleteImage(i: number) {
    this.listProductImage.splice(i, 1);
    this.lengthOfImage--;
    console.log(this.listProductImage);
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
      console.log(this.imageToUpFireBase);
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
            console.log(this.listProductImage);
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
    }, 3000);
  }
}

