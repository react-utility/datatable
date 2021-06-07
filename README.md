# React Datatable
This is another datatable library for react application. There are other great datatable libaries available on the npm repository, which doesn't comes out with much customization when it comes to CSS. While working with PWA application using react and tailwind for one of my client, I found that it's not very easy to customize CSS and themes at granular level using various CSS frameworks like bootstrap, tailwind etc or simple CSS. 

In some cases I found that when working with one css framework or none (just simple css) the other datatables libaries available in the market for react, uses another framework or some uses style-components, and then I have to manage CSS with both the framework and have to write some extra codes to work seamlessly.

*If you are looking for some simple react datatable with some in built functionality like pagination, sorting, progress bar etc. or full customization of these components and granular access to the table elements for any CSS framework or none of your choice then this is the datable library you are looking for. Give this React Datatable a try.*
<br>
<br>
## Table of contents

1. [Demo and Example](#Demo-and-Example)
2. [Key Features](#Key-Features)
3. [Requirement / Dependency](#Requirement-/-Dependency)
4. [Installation](#Installation)
5. [API](#API)
    - [Pagination](#Pagination)
    - [Sorting](#Sorting)
    - [Progressbar](#Progressbar)


## Demo and Example
<hr>

## Key Features
<hr>

## Requirement / Dependency
<hr>

## Installation
<hr>


## API
<hr>

### Basic Table
Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
columns | | | | 
data | | | | 
options | | | | 
classNames | | | | 

## Columns
Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
name | | | |
selector | | | |
sortable | | | |
sortIcon | | | |
showColumn | | | |

## Options / Properties

### Basic
Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
tableId  | `string | number` | `Math.floor(Math.random() * 1000)` | *Unique Id for the table. Details can be provided as a number or string. By defauult it takes a random number*|
showCaption | `boolean` | `false` | *Toggle switch to show table caption.*<br>*Expected Value `true` or `false`*<br><br>**`showCaption : true`**| |
caption | `string` | | *Provide table title as a string to this api. This caption will be shown before table header.* |
customCaption | | | |
noDataMessage | `string` | `No Data to Display` | *This api allows you to provide custom message to be displayed into the table when no data is found.*<br>*`noDataMessage` is not provided then it will default to `No Data to Display`*|
noDataComponent | | | |
responsive | `boolean` | | *This will make the table responive when screen size is small. Bascially it will add a scrollbar to the table so that you can scroll horizontally. This doesn't make vertically responsive to screen sizes.*<br>*Expected Value `true` or `false`*<br><br>**`responsive : true`**|
dense | `boolean` | | *Enabling this API will make the table dense. That being said it will make compacts the row height.* <br>*Expected Value `true` or `false`*<br><br>**`dense : true`**|
hideTableHeader | `boolean` | `false`  | *This API will allow you to hide the table header / column names. By default it is `false`.*<br> *By enabling this API will make the header disappear, hence all the functionality e.g. `sorting` will be unavailable.*<br>*Expected Value `true` or `false`*<br><br>**`hideTableHeader : true`**|
persistTableHead | | | |




### Pagination
*Pagination is a property to navigate rows within the table when dataset is large. By default pagination starts from begining. Following are the API available to controll pagination from your React Functional Component (JSX/TSX).*
<br>

Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
pagination | boolean | false | *Enable pagination in the table. By default this value is set to false.*<br>*Expected Value `true` or `false`*<br><br>**`pagination : true`**
paginationServer __(not-implemented)__ | boolean | | *Enable pagination at server*<br>*Expected Value `true` or `false`*<br><br>**`paginationServer : true`**|
showRowPerPageDropdown | boolean | true | *Show rows per page options dropdown for pagination. By default this value is set to true.*<br>*Expected Value `true` or `false`*<br><br>**`showRowPerPageDropdown : true`**|
showRowsPerPage | boolean | | *Show rows per page for pagination.*<br>*Expected Value `true` or `false`*<br><br>**`showRowsPerPage : true`**<br>If enabled this will show rows per page against total number of data.|
rowsPerPage | `{option : number[], defaultIndex: number` | `{ option: [5, 10, 15, 20], defaultIndex: 0 }` | *Collection of number of Rows to be displayed per page. `option` contains the choice of numbers and `defaulIndex` will contain the index value of the option that needs to selected by default.*<br><br>This default value depicts that by default rows per page will be `5` since `defaultIndex` is set to `0` which means `1st item` from the `option` array.
paginationIconFirstPage | `React.FC<any>` | | *Custom React Functional Component.*<br><br>Provide your custom Icon as PNG, SVG etc as react component to this option.<br>This will only change the Icon of the pagination Navigation|
paginationIconLastPage | `React.FC<any>` | | *Custom React Functional Component.*<br><br>Provide your custom Icon as PNG, SVG etc as react component to this option.<br>This will only change the Icon of the pagination Navigation|
paginationIconNext | `React.FC<any>` | | *Custom React Functional Component.*<br><br>Provide your custom Icon as PNG, SVG etc as react component to this option.<br>This will only change the Icon of the pagination Navigation|
paginationIconPrevious | `React.FC<any>` | |*Custom React Functional Component.*<br><br>Provide your custom Icon as PNG, SVG etc as react component to this option.<br>This will only change the Icon of the pagination Navigation |
customRowPerPageDropdown | `React.FC<{className?: string, updateRows: (currentSelectedIndex: number) => void, rowsPerPage?: RowsPerPage }>` | | *This API allows you to provide a custom dropdowm as a React Functional Component of your choice. This api contains the following parameters*<br><br>`className? : string`&nbsp;&nbsp;:&nbsp;&nbsp;*class provided for dropdown during initialization. Optional*<br><br>`updateRows: (currentSelectedIndex: number)`&nbsp;&nbsp;:&nbsp;&nbsp;*callback function with a parameter `currentSelectedIndex: number`*<br><br>`rowsPerPage?: RowsPerPage`&nbsp;&nbsp;:&nbsp;&nbsp;*rows per page option provided during initialization of the table or datatable default value*|
customPagination | `React.FC<any>` | | |
onPaginationPageChange | `function` | | |
<br>


### Sorting
<br>

Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
defaultSortHeader | string | | *Which column required to be initially sorted before data loads into UI.*<br><br>**`defaultSortHeader : 'id'`**
defaultSortAscending | boolean | true | *Toogle flag to sort column Ascending or Descending.*<br>*By Default Ascending order is choosen, if not specified with `defaultSortHeader` API*<br>*Expected Value `true` or `false`*<br><br>**`defaultSortAscending : true`**
sortIcon | Component `React.FC<HeaderItem>` | | *Please refer Column API's for sortIcon. Since sortIcon is more related to the header. This will ovveride the default sort icon. This should be a React Functional Component.*<br><br>*Please refer **Header API***
onSort __(not-implemented)__ | function | | *callback function to access the sorted state when a cloumn is clicked*<br>**return**<br>`column : any[], sortDirection: Sorting, event: React.MouseEvent<HTMLButtonElement>`<br><br>Where interface Sorting as<br>`enum Sorting {`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ASC,`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DESC`<br>`}`
customSortFunction __(not present in story book)__| function | | *Custom sort function of your own. If custom sort function is provided, default sort function will not take effect*<br><br> ***Should return an array of data***


### Progressbar
<br>

Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
showProgressPending | boolean | | *This is an boolean flag to show progress pending in the table. The state of this API should be managed in your React Component. This react datatable will not handle, or switch flags for this api.*<br>*Expected Value `true` or `false`*<br><br>**`showProgressPending : true`** |
customProgressPendingComponent | `React.FC<any>` | | *This api allow you to provide custom progress component which should be react functional component. This will allow you to create your own custom progress details as per your requirement* |