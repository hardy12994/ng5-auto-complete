import { AutoCompleteDirective } from "./directive/auto.directive";
import { NgModule } from "@angular/core";
@NgModule({
    declarations: [AutoCompleteDirective],
    exports: [AutoCompleteDirective]
})
export class AutoCompleteModule {
}
