import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import {Subject, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {

  }

  getPosts() {
    this.http.get<{isSuccess:boolean, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=> {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id : post._id
        }
      })
    }))
    .subscribe((transformPosts)=> {
        this.posts = transformPosts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(aTitle: string, aContent: string) {
    const post: Post = {id:null, title:aTitle, content:aContent}
    this.http.post<{isSuccess:boolean, postId: string}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
      const postId= responseData.postId;
      post.id = postId;
      if(responseData.isSuccess) {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      }
    });
  }

  deletePost(postId:string) {
    this.http.delete("http://localhost:3000/api/posts/"+ postId)
    .subscribe(()=> {
      const updatePosts = this.posts.filter(post => post.id != postId);
      this.posts = updatePosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
