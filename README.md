# ng5-auto-complete
# UNDER CONSTRUCTION


This Module can be use when you want Auto-Complete Functionality on your INPUT Tag in the 
Angular 5 Enviroment.You can use also with **Reactive Angular Forms** or with simple **ngmodel directive** Forms.


![1](http://res.cloudinary.com/dkws91cqo/image/upload/v1519209918/Screenshot_from_2018-02-21_16-06-21_wky5k3.png)

![2](http://res.cloudinary.com/dkws91cqo/image/upload/v1519209953/Screenshot_from_2018-02-21_16-06-25_gmgqo9.png)

![3](http://res.cloudinary.com/dkws91cqo/image/upload/v1519209957/Screenshot_from_2018-02-21_16-07-07_s1ghzk.png)

## Installation -
```sh

        npm install --save ng5-auto-complete

```

## What it provides is -

- WORKS with **REACTIVE-ANGULAR FORMS**,**NORMAL-FORMS**,**[(ngModel)]**
- RUN on Array of Strings `Array<String>` or an  Objects `Array<Object>`.
- Open the Auto-List on Number of Word-Length you have Typed. _**`Default 0`**_
- How many List-Members to be shown from Matches.  _**`Default 15`**_
- What Should be the `TEXT` on *NO RECORD FOUND*. _**`Default ''`**_

Works On -
--------

* TAP or CLICK
* TAB KEY
* ENTER KEY
* ON BLUR

## How to Start with it -


Please include these scripts in your main `index.html`.

```sh

    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

```


Now Import the AutoCompleteDirective in your main NgModule of your application

and insert this module in your declarations array of NgModule.

 ```sh

   //main module
   
   import { AutoCompleteDirective } from 'ng5-auto-complete';
   @NgModule({
       declarations :[
           AutoCompleteDirective
       ]
   })

 ``` 

Its time to Integrate this module in your HTML **INPUT** Tag

```sh

    <input id="list" [ng5-auto-complete]="list">

```

This will provide the list of 15 best match from provided list.


Here are the *Extented features* -

- **[word-trigger]** -

This is use when you want to open list on perticular word count. 
It Accepts Number. Default value = 0;

Example- `[word-trigger]="2"`                  

- **[list-length]** -

This is use when you want to set the length of list which will open. 
It Accepts Number. Default value = 15;

Example- `[list-length]="10"`

- **filterName** -

Only use when you are providing object List as `Array<Object>`.
which thing to filter from object and show that.
`[{ name:"hardy", hobby:"coding"},.....]` , here if `filterName` is *name*
then name is filtered and shown on input tag.

Example- ` filterName="name"`


**NOTE** -

If you not provide the filtername on providing the array list of objects it will throw ERROR.
        
- **no-record-text** -

This is use when you want to show when *no record found*.

Example - `no-record-text="No Records Found!"`   


*USED AS* -

```sh

<input style="margin: 40px;" id="list"
[ng5-auto-complete]="countryList" 
[word-trigger]="2" [list-length]="10"
filterName="name" no-record-text="No Records Found!" >

```


NOTE -
------

- It always sets **String** in the input ( on any list( `String or Object` )  )
- The List Above Should be of Array of Strings or Objects.
- The `Input Id should be Unique` in your HTML page.



*Contributions are most Wellcome.*