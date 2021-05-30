# React Datatable

## API

### Pagination
Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
pagination | boolean | | *Enable pagination in the table*<br>*Expected Value `true` or `false`*<br><br>**`pagination : true`**
rowsPerPage | `{option : number[], defaultIndex: number` | `{ option: [5, 10, 15, 20], defaultIndex: 0 }` | *Collection of number of Rows to be displayed per page. `option` contains the choice of numbers and `defaulIndex` will contain the index value of the option that needs to selected by default.*

<br>

### Sorting
Property | Type | Default | Description/Example
-------- | ---- | ------- | -------------------
defaultSortHeader | string | | *Which column required to be initially sorted before data loads into UI.*<br><br>**`defaultSortHeader : 'id'`**
defaultSortAscending | boolean | true | *Toogle flag to sort column Ascending or Descending.*<br>*By Default Ascending order is choosen, if not specified with `defaultSortHeader` API*<br>*Expected Value `true` or `false`*<br><br>**`defaultSortAscending : true`**
sortIcon | Component `React.FC<HeaderItem>` | | *Please refer Header API's for sortIcon. Since sortIcon is more related to the header. This will ovveride the default sort icon. This should be a React Functional Component.*<br><br>*Please refer **Header API***
onSort __(not-implemented)__ | function | | *callback function to access the sorted state when a cloumn is clicked*<br>**return**<br>`column : any[], sortDirection: Sorting, event: React.MouseEvent<HTMLButtonElement>`<br><br>Where interface Sorting as<br>`enum Sorting {`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ASC,`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DESC`<br>`}`
customSortFunction __(not present in story book)__| function | | *Custom sort function of your own. If custom sort function is provided, default sort function will not take effect*<br><br> ***Should return an array of data***
