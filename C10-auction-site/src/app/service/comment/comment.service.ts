import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../../model/Comment';
import {AccountService} from '../authentication/account-service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = 'http://localhost:8080/api/comment';
  options: any;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.options = this.accountService.httpOptions;
  }

  /**
   * Author : SonPH
   * find all comment by productID
   *
   */
  findAllCommentByProductId(productId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/product/' + productId, this.options);
  }

  /**
   * Author : SonPH
   * find comment by commentID
   */
  findCommentById(commentId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + commentId, this.options);
  }

  /**
   * Author : SonPH
   * create a new comment
   */
  createNewComment(comment: Comment): Observable<any> {
    return this.http.post<any>(this.baseUrl, comment, this.options);
  }

  /**
   * Author : SonPH
   * update comment
   */
  updateComment(comment: Comment): Observable<any> {
    return this.http.put(this.baseUrl + '/edit/' + comment.commentId, comment, this.options);
  }

  /**
   * Author : SonPH
   * delete comment
   */
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/delete/' + commentId, this.options);
  }
}
