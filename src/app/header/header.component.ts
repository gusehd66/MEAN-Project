import { Component } from "@angular/core";

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar color="primary">
    <span>
      <a routerLink="/">
        MyMessages
      </a>
    </span>
    <span class="spacer"></span>
    <ul>
      <li>
        <a mat-button routerLink="/create" routerLinkActive="mat-accent">
          New Post
        </a>
      </li>
    </ul>
  </mat-toolbar>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

}
