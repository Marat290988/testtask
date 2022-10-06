import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from "src/app/shared.module";
import { PostsParentComponent } from "./posts-parent/posts-parent.component";
import { PostsComponent } from './posts.component';
import { PostItemComponent } from './post-item/post-item.component';

@NgModule({
  declarations: [
    PostsParentComponent,
    PostsComponent,
    PostItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: PostsParentComponent, children: [
        {path: '', pathMatch: 'full', component: PostsComponent},
        {path: ':id', component: PostItemComponent}
      ]},
    ]),
    SharedModule
  ]
})
export class PostsModule {

}