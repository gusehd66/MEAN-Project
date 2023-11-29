import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(aTitle: string, aContent: string) {
    const post: Post = {title:aTitle, content:aContent}
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
