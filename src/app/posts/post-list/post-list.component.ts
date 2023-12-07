import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  template: `
   <mat-accordion [multi]="true" *ngIf="posts.length > 0">
    <mat-expansion-panel *ngFor="let post of posts">
      <mat-expansion-panel-header>
        {{ post.title}}
      </mat-expansion-panel-header>
      <p>{{ post.content}}</p>
      <mat-action-row>
        <button mat-button color="primary">EDIT</button>
        <button mat-button color="warn">DELETE</button>
      </mat-action-row>
    </mat-expansion-panel>
   </mat-accordion>
  <p class="info-text mat-body-1" *ngIf="posts.length <= 0">No Posts.</p>
  `,
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(private postService: PostService) {

  }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[])=> {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
