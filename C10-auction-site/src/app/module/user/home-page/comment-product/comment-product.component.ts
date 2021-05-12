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

  constructor(private commentService: CommentService,
              private productService: ProductService,
              private activatedRouter: ActivatedRoute,
              private formBuilder: FormBuilder) {
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
  }

  getAllCommentByProductId(productId: number) {
    this.commentService.findAllCommentByProductId(productId).subscribe(data => {
      this.comments = data;
    });
  }

  createComment() {
    this.formComment.get('content').setValue($('#myText').data('emojioneArea').getText());
    this.formComment.get('image').setValue('abc.jpg');
    console.log(this.formComment.value);
    this.commentService.createNewComment(this.formComment.value).subscribe(data => {
      $('#myText').data('emojioneArea').setText('');
      this.ngOnInit();
    });
  }
}
