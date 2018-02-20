Using Input Tag and on type the list refresh, with Features - show list length, taking String/Object list, list trigger on word count, takes string and gives string

# ng5-auto-complete

This Module can be use when you want Auto-Complete Functionality on your INPUT Tag in the 
Angular 5 Enviroment.

## Installation 
```sh

        npm install --save ng5-auto-complete

```


## What it provides is -

- RUN on Array of Strings `Array<String>` or an  Objects `Array<Object>`.
- Open the Auto-List on Number of Word-Length you have Typed. _**`Default 0`**_
- How many List-Members to be shown from Matches.  _**`Default all-are-shown`**_
- What Should be the `TEXT` on *NO RECORD FOUND*.

Works On -
--------

* TAP or CLICK
* TAB KEY
* ENTER KEY
* ON BLUR

## How to Start with it-

Just Import the AutoCompleteModule in your main NgModule of your application

and insert this module in your imports array of NgModule.

 ```sh

   //main module
   
   import { AutoCompleteModule } from 'ng5-auto-complete';
   @NgModule({
       imports :[
           AutoCompleteModule
       ]
   })

 ``` 

Now Integrate this module in your HTML **INPUT** Tag

```sh

    <input id="myInput" [ng5-auto-complete]="list">

```

NOTE - The List Above Should be of Array of Strings or Objects.

