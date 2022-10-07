import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { PhotosComponent } from "./photos.component";
import { PhotosParentComponent } from './photos-parent/photos-parent.component';
import { PhotosItemComponent } from './photos-item/photos-item.component';
import { SharedModule } from "src/app/shared.module";

@NgModule({
  declarations: [
    PhotosComponent,
    PhotosParentComponent,
    PhotosItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: PhotosParentComponent, children: [
        {path: '', pathMatch: 'full', component: PhotosComponent},
        {path: ':id', component: PhotosItemComponent}
      ]}
    ]),
    SharedModule
  ]
})
export class PhotosModule {

}

