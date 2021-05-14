import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../../../service/comment/comment.service';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../../../../models/Comment';
import {User} from '../../../../models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../../models/Account';
import {ProductService} from '../../../../service/product/product.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ngxLoadingAnimationTypes} from 'ngx-loading';

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

  comments: Comment[];
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

  constructor(private commentService: CommentService,
              private productService: ProductService,
              private activatedRouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private formBuilders: FormBuilder,
              public storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.fileImage = [];
    this.fileImageEdit = [];
    const productId = this.activatedRouter.snapshot.params.id;
    this.getAllCommentByProductId(productId);
    this.user = {
      userId: 2,
      userName: 'Hồng Sơn',
      birthday: '1997-10-24',
      phone: '0905353545',
      identity: 'xyz',
      avatar: 'https://scontent.fdad4-1.fna.fbcdn.net/v/t1.6435-9/117400169_1728001497348245_3122136719951140099_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=QXuObWvM7ZsAX_I-YbX&_nc_ht=scontent.fdad4-1.fna&oh=c901078c43897a8f10e1667e4bf9ddf4&oe=60BF0577',
      address: 'Tây Ninh',
    };
    this.account = {
      accountId: 2,
      accountName: 'skloi',
      password: '123456',
      email: 'son@gmail.com',
      enable: true,
      logoutTime: '',
      user: this.user
    };
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
  }

  /**
   * Author : SonPH
   * find all comment by productId
   */
  getAllCommentByProductId(productId: number) {
    this.commentService.findAllCommentByProductId(productId).subscribe(data => {
      this.comments = data;
    });
  }

  /**
   * Author : SonPH
   * create comment
   */
  async createComment() {
    // @ts-ignore
    // tslint:disable-next-line:one-variable-per-declaration
    const Filter = require('bad-words'),
      filter = new Filter();
    filter.addWords('Đụ', 'ma', 'cai lon', 'lon', 'cac');
    if (($('#myText').data('emojioneArea').getText() !== '')) {
      this.message = null;
      this.loading = true;
      await this.addImageToFireBase(this.fileImage);
      this.formComment.get('content').setValue(filter.clean($('#myText').data('emojioneArea').getText()));
      this.formComment.get('image').setValue(this.urlImage);
      this.commentService.createNewComment(this.formComment.value).subscribe(data => {
        this.loading = false;
        $('#myText').data('emojioneArea').setText('');
        this.ngOnInit();
        this.fileImage = [];
        this.check = false;
      });
    } else {
      this.message = 'Không được để trống nội dung!!';
    }
  }

  /**
   * Author : SonPH
   * send form edit to screen
   */
  sendFormEdit(commentId: number) {
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
    // @ts-ignore
    // tslint:disable-next-line:one-variable-per-declaration
    const Filter = require('bad-words'),
      filter = new Filter();
    filter.addWords('Đụ', 'ma', 'cai lon', 'lon', 'cac');
    if ($('#editComment').data('emojioneArea').getText() !== '') {
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
      this.formEditComment.get('content').setValue(filter.clean($('#editComment').data('emojioneArea').getText()));
      this.commentService.updateComment(this.formEditComment.value).subscribe(data => {
        $('#editCommentModal').click();
        this.loadingEdit = false;
        $('#editComment').data('emojioneArea').setText('');
        this.ngOnInit();
        this.checkImageEdit = false;
      });
    } else {
      this.messageEdit = 'Không được để trống nội dung trong lúc chỉnh sửa!!';
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
    this.messageEdit = null;
  }
}

