import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {

  }

  getPosts() {
    this.http.get<{isSuccess:boolean, posts:Post[]}>('http://localhost:3000/api/posts').subscribe((postData)=> {
      if(postData.isSuccess) {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      }
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(aTitle: string, aContent: string) {
    const post: Post = {id:null, title:aTitle, content:aContent}
    this.http.post<{isSuccess:boolean}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
      console.log(responseData);
      if(responseData.isSuccess) {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      }
    });
  }
}
