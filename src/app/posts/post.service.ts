import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import {Subject, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from "express";

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {

  }

  getPosts() {
    const tt= this.http.get<{isSuccess:boolean, posts:any}>('http://localhost:3000/api/posts');
    tt.pipe(map((postData)=> {
      console.log(postData);
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

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }

  addPost(aTitle: string, aContent: string) {
    const post: Post = {id:null, title:aTitle, content:aContent}
    this.http.post<{isSuccess:boolean, postId: string}>("http://localhost:3000/api/posts", post).subscribe((responseData)=>{
      const postId= responseData.postId;
      post.id = postId;
      if(responseData.isSuccess) {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      }
    });
  }

  updatePost(aID: string, aTitle: string, aContent: string) {
    const post :Post = {id:aID, title: aTitle, content: aContent};
    this.http.put("http://localhost:3000/api/posts/" + aID, post)
    .subscribe(response => {
      const updatePosts = [...this.posts];
      const oldPostIndex = updatePosts.findIndex(p => p.id === post.id);
      updatePosts[oldPostIndex] = post;
      this.posts = updatePosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(aPostId:string) {
    this.http.delete("http://localhost:3000/api/posts/"+ aPostId)
    .subscribe(()=> {
      const updatePosts = this.posts.filter(post => post.id != aPostId);
      this.posts = updatePosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
