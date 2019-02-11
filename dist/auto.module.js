var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AutoCompleteDirective } from "./auto.directive";
import { NgModule } from "@angular/core";
var AutoCompleteModule = /** @class */ (function () {
    function AutoCompleteModule() {
    }
    AutoCompleteModule = __decorate([
        NgModule({
            declarations: [AutoCompleteDirective],
            exports: [AutoCompleteDirective]
        })
    ], AutoCompleteModule);
    return AutoCompleteModule;
}());
export { AutoCompleteModule };
//# sourceMappingURL=auto.module.js.map