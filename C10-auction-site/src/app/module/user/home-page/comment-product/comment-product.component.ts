import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../../../service/comment/comment.service';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../../../../model/Comment';
import {User} from '../../../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../../model/account';
import {ProductService} from '../../../../service/product/product.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {TokenStorageService} from '../../../../service/authentication/token-storage';

declare const $: any;

@Component({
  selector: 'app-comment-product',
  templateUrl: './comment-product.component.html',
  styleUrls: ['./comment-product.component.css']
})
export class CommentProductComponent implements OnInit {
  config = {
    animationType: ngxLoadingAnimationTypes.doubleBounce,
    primaryColour: '#006ddd',
    backdropBorderRadius: '3px'
  };
  loading = false;
  loadingEdit = false;

  comments = new Array<Comment>();
  user: User;
  formComment: FormGroup;
  account: Account;
  formEditComment: FormGroup;
  idDeleteComment: number;
  message: string;
  messageEdit: string;
  fileImage: any;
  fileImageEdit: any;
  check = false;
  checkImageEdit = false;
  private urlImage: string;
  urlImageEdit: string;
  isLogged: boolean;
  length: number;

  constructor(private commentService: CommentService,
              private productService: ProductService,
              private activatedRouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private formBuilders: FormBuilder,
              public storage: AngularFireStorage,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLogged = this.tokenStorage.isLogged();
    this.fileImage = [];
    this.fileImageEdit = [];
    const productId = this.activatedRouter.snapshot.params.id;
    this.getAllCommentByProductId(productId);
    if (this.isLogged) {
      this.account = this.tokenStorage.getAccount();
      this.user = this.account.user;
    }
    this.formComment = this.formBuilder.group({
      content: ['', [Validators.required]],
      image: [''],
      product: [''],
      account: [this.account]
    });
    this.productService.findProductById(productId).subscribe(data => {
      this.formComment.get('product').setValue(data);
    });
    this.formEditComment = this.formBuilders.group({
      commentId: [''],
      content: ['', [Validators.required]],
      image: [''],
      commentTime: [''],
      product: [''],
      account: ['']
    });
    this.emoji();
  }

  /**
   * Author : SonPH
   * find all comment by productId
   */
  getAllCommentByProductId(productId: number) {
    this.commentService.findAllCommentByProductId(productId).subscribe(data => {
      this.comments = data;
      console.log(data)
    });
  }

  emoji() {
    $(document).ready(function () {
      $('#myText').emojioneArea({
        search: false,
        pickerPosition: 'top'
      });

      $('#editComment').emojioneArea({
        search: false,
        pickerPosition: 'right'
      });
    });
  }

  /**
   * Author : SonPH
   * create comment
   */
  async createComment() {
    if (($('#myText').data('emojioneArea').getText().trim() !== '')) {
      if ($('#myText').data('emojioneArea').getText().length <= 100) {
        this.message = null;
        this.loading = true;
        await this.addImageToFireBase(this.fileImage);
        this.formComment.get('content').setValue($('#myText').data('emojioneArea').getText());
        this.formComment.get('image').setValue(this.urlImage);
        this.commentService.createNewComment(this.formComment.value).subscribe(data => {
          this.loading = false;
          $('#myText').data('emojioneArea').setText('');
          this.ngOnInit();
          this.fileImage = [];
          this.check = false;
        });
      } else {
        this.message = 'Nội dung không được quá 100 kí tự!!';
      }
    } else {
      this.message = 'Không được để trống nội dung!!';
      $('#myText').data('emojioneArea').setText('');
    }
  }

  /**
   * Author : SonPH
   * send form edit to screen
   */
  sendFormEdit(commentId: number) {
    this.messageEdit = null;
    this.checkImageEdit = false;
    this.fileImage = [];
    this.fileImageEdit = [];
    this.check = false;
    this.commentService.findCommentById(commentId).subscribe(data => {
      this.formEditComment.get('commentId').setValue(data.commentId);
      this.formEditComment.get('content').setValue(data.content);
      this.formEditComment.get('image').setValue(data.image);
      this.formEditComment.get('commentTime').setValue(data.commentTime);
      this.formEditComment.get('product').setValue(data.product);
      this.formEditComment.get('account').setValue(data.account);
      this.urlImageEdit = data.image;
      $('#editComment').data('emojioneArea').setText(data.content);
    });
  }

  /**
   * Author : SonPH
   * edit comment
   */
  async editComment() {
    if ($('#editComment').data('emojioneArea').getText().trim() !== '') {
      if ($('#editComment').data('emojioneArea').getText().length <= 100) {
        this.loadingEdit = true;
        this.messageEdit = null;
        await this.addImageToFireBase(this.fileImageEdit);
        if (this.urlImageEdit == null && this.urlImage == null) {
          this.formEditComment.get('image').setValue(null);
        } else if (this.urlImageEdit != null && this.urlImage == null) {
          this.formEditComment.get('image').setValue(this.urlImageEdit);
        } else if (this.urlImageEdit == null && this.urlImage != null) {
          this.formEditComment.get('image').setValue(this.urlImage);
        }
        this.formEditComment.get('content').setValue($('#editComment').data('emojioneArea').getText());
        this.commentService.updateComment(this.formEditComment.value).subscribe(data => {
          $('#editCommentModal').click();
          this.loadingEdit = false;
          $('#editComment').data('emojioneArea').setText('');
          this.ngOnInit();
          this.checkImageEdit = false;
        });
      } else {
        this.messageEdit = "Nội dung không được quá 100 kí tự!!"
      }
    } else {
      this.messageEdit = 'Không được để trống nội dung trong lúc chỉnh sửa!!';
      $('#editComment').data('emojioneArea').setText('');
    }
  }

  /**
   * Author : SonPH
   *  get commentId from screen
   */
  getCommentIdToDelete(commentId: number) {
    this.idDeleteComment = commentId;
  }

  /**
   * Author : SonPH
   * delete comment
   */
  deleteComment() {
    this.commentService.deleteComment(this.idDeleteComment).subscribe(data => {
      this.ngOnInit();
    });
  }

  /**
   * Author : SonPH
   * import image to screen and validate image
   */
  importImages(event) {
    this.fileImage = [];
    const files = event.target.files;
    const length = files.length;
    if (length < 2) {
      for (const file of files) {
        const name = file.type;
        const size = file.size;
        if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
          if (size <= 1000000) {
            this.check = true;
            this.message = null;
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.fileImage.push({
                url: e.target.result,
                file
              });
            };
            reader.readAsDataURL(file);
          } else {
            this.check = false;
            return this.message = 'Dung lượng ảnh quá cao!!';
          }
        } else {
          this.check = false;
          return this.message = 'Đây không phải hình ảnh!!';
        }
      }
    } else {
      this.check = false;
      return this.message = 'Chỉ được chọn một ảnh!!';
    }
  }

  /**
   * Author : SonPH
   * delete image in screen
   */
  deleteUpdateImage() {
    this.fileImage = [];
    this.check = false;
  }

  /**
   * Author : SonPH
   * add image to firebase
   */
  addImageToFireBase(fileChanges: any) {
    this.urlImage = null;
    return new Promise(resolve => {
      Promise.all(fileChanges.map(file =>
        new Promise((resolve) => {
          const name = file.file.name;
          if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
            const fileRef = this.storage.ref(name);
            // const fileRef = this.storage.ref("/filename" +name); lưu vào thư mục filename
            this.storage.upload(name, file.file).snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL()
                  .subscribe((url) => {
                    this.urlImage = url;
                    resolve(1);
                  });
              })).subscribe();
          }
        }))).then(() => {
        resolve(1);
      });
    });
  }

  get content() {
    return this.formComment.get('content');
  }

  get contentEdit() {
    return this.formEditComment.get('content');
  }

  /**
   * Author : SonPH
   * delete image in screen edit
   */
  deleteImageEdit() {
    this.urlImageEdit = null;
  }

  /**
   * Author : SonPH
   * import image in screen edit
   */
  importImagesEdit(event) {
    this.fileImageEdit = [];
    if (this.urlImageEdit == null) {
      const files = event.target.files;
      const length = files.length;
      console.log(length);
      if (length < 2) {
        for (const file of files) {
          const name = file.type;
          const size = file.size;
          if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
            if (size <= 1000000) {
              this.checkImageEdit = true;
              this.messageEdit = null;
              const reader = new FileReader();
              reader.onload = (e: any) => {
                this.fileImageEdit.push({
                  url: e.target.result,
                  file
                });
              };
              reader.readAsDataURL(file);
              console.log(this.fileImageEdit);
            } else {
              this.checkImageEdit = false;
              return this.messageEdit = 'Dung lượng ảnh quá cao!!';
            }
          } else {
            this.checkImageEdit = false;
            return this.messageEdit = 'Đây không phải hình ảnh!!';
          }
        }
      } else {
        this.checkImageEdit = false;
        return this.messageEdit = 'Chỉ được chọn một ảnh!!';
      }
    } else {
      this.checkImageEdit = false;
      return this.messageEdit = 'Bình luận này đã có ảnh, vui lòng xóa để thay đổi ảnh khác!!';
    }
  }

  /**
   * Author : SonPH
   * get check validate in screen edit
   */
  getCheck() {
    this.message = null;
    this.messageEdit = null;
    this.fileImageEdit = null;
    this.checkImageEdit = false;
  }
}

