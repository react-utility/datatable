import { IHeaderCss, Sorting, SortOptions } from "./interfaces";

export interface IDataTableProps {
    header: Array<IColumn> | null | undefined,
    data: Array<any> | null | undefined,
    options?: IDataTableOptions
    classNames? : IDataTableCSS
}

export interface IColumn {
    name?: string,
    selector?: string,
    sortable?: boolean,
    format? : (row : {},index: number) => {},
    className? : string,
    width?: string,
    minWidth?: string,
    maxWidth?: string,
    right?:string,
    center?:string,
    compact?:string,
    wrap?: boolean,
    hide?: number | string,
    omit?: boolean,
    id? : string | number,
    sortIcon? : React.FC
}

export interface IDataTableOptions{
    stripped? : boolean,
    highlightOnHover? : boolean,
    noDataComponent? : React.FC,
    dense? : boolean,
    direction?: string,
    pagination? : boolean,
    pageNumber? : number[],
    defaultSortHeader? : string,
    defaultSortAsc? : boolean,
    onSort? : (column : any[], sortDirection: Sorting, event: React.MouseEvent<HTMLButtonElement>) => void,
    customSortFunction? : (options:SortOptions) => any[],
    showProgressPending? : boolean,
    customProgressPendingComponent? : React.FC,
}

export interface IDataTableCSS {
    highlightOnHoverClass?: string,
    header?: IHeaderCss,
}