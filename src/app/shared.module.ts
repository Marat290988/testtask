import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoaderComponent } from "./components/loader/loader.component";
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoaderComponent,
        PaginatorComponent
    ],
    exports: [
        LoaderComponent,
        PaginatorComponent
    ]
})
export class SharedModule {

}