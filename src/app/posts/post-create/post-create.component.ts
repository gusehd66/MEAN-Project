import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-post-create',
  template: `
  <mat-card>
    <form (submit)="onSavePost(postForm)" #postForm="ngForm">
      <mat-form-field>
        <input matInput type="text" name="title" [ngModel]="post?.title" required minlength="2" #title="ngModel" placeholder="Post Title">
        <mat-error *ngIf="title.invalid">Please enter a post Title.</mat-error>
      </mat-form-field>
      <mat-form-field>
        <textarea rows="4"matInput name="content" [ngModel]="post?.content" required #content="ngModel" placeholder="Post Content"></textarea>
        <mat-error *ngIf="content.invalid">Please enter a post Content.</mat-error>
      </mat-form-field>
      <button mat-raised-button color="accent" type="submit">
        Save Post
      </button>
    </form>
  </mat-card>
  `,
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle= '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  public post: Post;

  constructor(private postService: PostService, public route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          console.log(postData);
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  public onSavePost(form: NgForm) {
    if(form.invalid) {
      return;
    }

    if(this.mode == 'create') {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.resetForm();
  }
}
