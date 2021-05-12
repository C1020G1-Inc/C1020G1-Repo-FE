import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../../../service/comment/comment.service';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../../../../models/Comment';
import {User} from '../../../../models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../../models/Account';
import {ProductService} from '../../../../service/product/product.service';

declare const $: any;

@Component({
  selector: 'app-comment-product',
  templateUrl: './comment-product.component.html',
  styleUrls: ['./comment-product.component.css']
})
export class CommentProductComponent implements OnInit {
  comments: Comment[];
  user: User;
  formComment: FormGroup;
  account: Account;
  formEditComment: FormGroup;
  idDeleteComment: number;
  message: string;
  fileImage: any;
  check = false;

  constructor(private commentService: CommentService,
              private productService: ProductService,
              private activatedRouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private formBuilders: FormBuilder) {
  }

  ngOnInit(): void {
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
  createComment() {
    if (($('#myText').data('emojioneArea').getText() !== '')) {
      this.message = null;
      this.formComment.get('content').setValue($('#myText').data('emojioneArea').getText());
      this.formComment.get('image').setValue('abc.jpg');
      console.log(this.formComment.value);
      this.commentService.createNewComment(this.formComment.value).subscribe(data => {
        $('#myText').data('emojioneArea').setText('');
        this.ngOnInit();
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
      console.log(this.formEditComment.value);
      $('#editComment').data('emojioneArea').setText(data.content);
    });
  }

  /**
   * Author : SonPH
   * edit comment
   */
  editComment() {
    this.formEditComment.get('content').setValue($('#editComment').data('emojioneArea').getText());
    console.log(this.formEditComment.value);
    this.commentService.updateComment(this.formEditComment.value).subscribe(data => {
      $('#editComment').data('emojioneArea').setText('');
      this.ngOnInit();
    });
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
    const files = event.target.files;
    console.log(files);
    const length = files.length;
    if (length < 2) {
      const name = files[0].type;
      const size = files[0].size;
      if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        if (size <= 1000000) {
          this.check = true;
          this.message = null;
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.fileImage = {
              url: e.target.result,
              file: files[0]
            };
          };
          reader.readAsDataURL(files[0]);
          console.log(this.fileImage);
        } else {
          this.check = false;
          return this.message = 'Dung lượng ảnh quá cao!!';
        }
      } else {
        this.check = false;
        return this.message = 'Đây không phải hình ảnh!!';
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
  deleteUpdateImage(event) {
    this.fileImage = null;
    this.check = false;
  }
}

