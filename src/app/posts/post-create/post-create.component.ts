import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-create',
  template: `
  <mat-card>
    <form (submit)="onAddPost(postForm)" #postForm="ngForm">
      <mat-form-field>
        <input matInput type="text" name="title" ngModel required minlength="2" #title="ngModel" placeholder="Post Title">
        <mat-error *ngIf="title.invalid">Please enter a post Title.</mat-error>
      </mat-form-field>
      <mat-form-field>
        <textarea rows="4"matInput name="content" ngModel required #content="ngModel" placeholder="Post Content"></textarea>
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
export class PostCreateComponent {
  enteredTitle= '';
  enteredContent = '';

  constructor(private postService: PostService){

  }

  public onAddPost(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
