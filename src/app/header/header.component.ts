import { Component } from "@angular/core";

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar color="primary">
    <span>
      <a routerLink="">
        MyMessages
      </a>
    </span>
    <ul>
      <li>
        <a routerLink="/create">
          New Post
        </a>
      </li>
    </ul>
  </mat-toolbar>
  `,
})
export class HeaderComponent {

}
