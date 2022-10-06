import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent},
      {path: 'posts', loadChildren: () => import('./components/posts/posts.module')
        .then(module => module.PostsModule)
      },
      {path: 'photos', loadChildren: () => import('./components/photos/photos.module')
        .then(module => module.PhotosModule)
      },
      {path: '**', component: DashboardComponent}
    ]),
    NgbModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
