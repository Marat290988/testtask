import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { PhotosComponent } from "./photos.component";

@NgModule({
  declarations: [
    PhotosComponent
  ],
  imports: [
  CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: PhotosComponent}
    ])
  ]
})
export class PhotosModule {

}