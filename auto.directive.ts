import {
    Directive,
    ElementRef,
    Input,
    Renderer2,
    OnInit,
    EventEmitter,
    Output,
    Optional
} from "@angular/core";
import { Observable, fromEvent } from "rxjs";
import { NgControl } from "@angular/forms";

declare const $: any;

@Directive({
    selector: '[ng5-auto-complete]'
})

export class AutoCompleteDirective implements OnInit {

    @Output() ngModelChange = new EventEmitter(); // for normal model change
    @Output() valueChanged = new EventEmitter();  // for normal value change
    noRecordPlaceHolder: string;
    filterName: string;
    listlength: number = 15;
    listType: string;
    list: Array<any>;
    wordTrigger: number;
    listShown: any;
    inpRef: any;
    dropdownInitiated = false;

    constructor(public elemRef: ElementRef,
        public renderer: Renderer2,
        @Optional() public reactiveFormControl: NgControl
    ) {
        this.inpRef = elemRef.nativeElement;
        this.activateEvents();
    }

    ngOnInit() {
        this.configureListType();
        this.configureDirective();
    }

    @Input('ng6-auto-complete') set autoComplete(list: any) {
        this.list = list ? (list.length ? list : []) : [];
    }

    @Input('word-trigger') set openOnWordLength(word_trigger: number) {
        this.wordTrigger = Number(word_trigger);
    }

    @Input('list-length') set listLengthToShow(listlength: number) {
        this.listlength = Number(listlength);
    }

    @Input('filterName') set filterIdentity(filterName: string) {
        this.filterName = filterName;
    }

    @Input('no-record-text') set noRecordText(defaultText: string) {
        this.noRecordPlaceHolder = defaultText;
    }


    configureListType() {

        if (this.list.length && typeof this.list[0] === "object") {
            this.listType = "object"
        }

        if (this.list.length && typeof this.list[0] === "string") {
            this.listType = "string"
        }
    }

    configureDirective() {
        if (!this.inpRef["id"]) {
            throw "auto-directive ID Required! Please provide the unique directive id";
        }

        if (this.listType === "object" && !this.filterName) {
            throw "Object List Found! Please provide filterName to pluck from object";
        }

        if (this.wordTrigger) {
            this.listShown = [];
            return;
        }

        // initiated coz- after one leter it helps to open
        this.filterList();
        this.initDropdown();
    }

    filterList() {
        var that = this;
        var fieldTomatch = new RegExp(that.elemRef.nativeElement["value"], 'ig');
        var data = [];

        if (that.listType === "string") {
            data = that.list.filter((item: any) => (item.toLowerCase()).match(fieldTomatch));
        }

        if (that.listType === "object") {
            data = that.list.filter((item: any) => (item[that.filterName].toLowerCase()).match(fieldTomatch));
        }

        if (that.listlength) {
            that.listShown = data.slice(0, this.listlength);
        } else {
            that.listShown = that.list; //all
        }

        return that.listShown;
    }


    initDropdown(list: any = undefined) {

        var id = `#${this.inpRef["id"]}`;

        if (this.noRecordPlaceHolder &&
            list === undefined &&
            this.listShown.length === 1 &&
            this.listShown[0] === this.noRecordPlaceHolder) {

            var that = this;
            var id = `#${that.inpRef["id"]}`;

            $(id).autocomplete({
                source: function (request: any, response: any) {
                    var matcher = new RegExp(that.noRecordPlaceHolder, "i");
                    response(that.listShown, function (val: any) {
                        console.log(val);
                    });
                }
            })

        } else {
            if (this.listType === "object") {

                var listData: any = [];
                this.listShown.forEach((item: any) => {
                    listData.push(item[this.filterName])
                });

                $(id).autocomplete({
                    source: list != undefined ? list : listData
                });

            } else {
                $(id).autocomplete({
                    source: list != undefined ? list : this.listShown
                });
            }

        }

    }

    searchfromList(ui: any) {
        var that = this;

        var toFind = (ui && ui.item) ? ui.item.value : that.elemRef.nativeElement["value"];
        if (that.listType === "string") {
            var data = that.list.find(item => toFind === item);
            return data;
        }

        if (that.listType === "object") {
            var data = that.list.find(item => toFind === item[that.filterName]);
            return data;
        }
    }

    activateEvents() {
        var that = this;
        var id = `#${that.inpRef["id"]}`;

        $(id)
            .on("autocompleteselect", function (event: any, ui: any) {

                //for ngmodule                
                if (that.searchfromList(ui)) {
                    that.ngModelChange.emit(ui.item.value);
                    that.valueChanged.emit(ui.item.value);
                } else {
                    that.ngModelChange.emit("");
                    that.valueChanged.emit("");
                }

                // for Rectiveforms model
                if (that.reactiveFormControl) {
                    if (that.searchfromList(ui)) {
                        that.reactiveFormControl.control.setValue(ui.item.value);
                    } else {
                        that.reactiveFormControl.control.setValue("");
                    }
                }

            });

        $(id)
            .on("autocompletechange", function (event: any, ui: any) {

                //for ngmodule
                if (that.searchfromList(ui)) {
                    that.ngModelChange.emit(that.elemRef.nativeElement["value"]);
                    that.valueChanged.emit(that.elemRef.nativeElement["value"]);

                } else {
                    that.ngModelChange.emit("");
                    that.valueChanged.emit("");
                }

                // for Rectiveforms model
                if (that.reactiveFormControl) {
                    if (that.searchfromList(ui)) {
                        that.reactiveFormControl.control.setValue(that.elemRef.nativeElement["value"]);
                    } else {
                        that.reactiveFormControl.control.setValue("");
                    }
                }

            });

        fromEvent(this.elemRef.nativeElement, 'keyup')
            .subscribe((e: any) => {

                this.removeOldList();

                if (that.inpRef["value"].length <= (that.wordTrigger - 1)) {
                    that.initDropdown([]);
                    return;
                }

                that.filterList();

                if (that.noRecordPlaceHolder && !that.listShown.length) {
                    this.listShown = [that.noRecordPlaceHolder];
                    that.initDropdown();
                    return;

                }
                that.initDropdown();
            })
    }

    removeOldList() {
        this.initDropdown([]);
    }
}