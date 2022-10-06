import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from "./components/loader/loader.component";
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoaderComponent,
        PaginatorComponent
    ],
    exports: [
        LoaderComponent,
        PaginatorComponent,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {

}