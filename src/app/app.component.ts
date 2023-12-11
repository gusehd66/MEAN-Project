import { Component, OnInit } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
        <router-outlet></router-outlet>
      <!-- <app-post-create></app-post-create>
      <app-post-list></app-post-list> -->
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
