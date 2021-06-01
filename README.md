# React Datatable

## API

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
paginationIconFirstPage | `React.FC<any>` | | |
paginationIconLastPage | `React.FC<any>` | | |
paginationIconNext | `React.FC<any>` | | |
paginationIconPrevious | `React.FC<any>` | | |
customRowPerPageDropdown | `React.FC<any>` | | |
customPagination | `React.FC<any>` | | |
onPaginationPageChange | `function` | | |
<br>


### Sorting
Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
defaultSortHeader | string | | *Which column required to be initially sorted before data loads into UI.*<br><br>**`defaultSortHeader : 'id'`**
defaultSortAscending | boolean | true | *Toogle flag to sort column Ascending or Descending.*<br>*By Default Ascending order is choosen, if not specified with `defaultSortHeader` API*<br>*Expected Value `true` or `false`*<br><br>**`defaultSortAscending : true`**
sortIcon | Component `React.FC<HeaderItem>` | | *Please refer Header API's for sortIcon. Since sortIcon is more related to the header. This will ovveride the default sort icon. This should be a React Functional Component.*<br><br>*Please refer **Header API***
onSort __(not-implemented)__ | function | | *callback function to access the sorted state when a cloumn is clicked*<br>**return**<br>`column : any[], sortDirection: Sorting, event: React.MouseEvent<HTMLButtonElement>`<br><br>Where interface Sorting as<br>`enum Sorting {`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ASC,`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DESC`<br>`}`
customSortFunction __(not present in story book)__| function | | *Custom sort function of your own. If custom sort function is provided, default sort function will not take effect*<br><br> ***Should return an array of data***
