
import { NgModule } from '@angular/core';
import { AutoComplete } from './directive/auto.directive';

@NgModule({
    exports: [AutoComplete],
    declarations: [AutoComplete]
})

export class AutoCompleteModule { }