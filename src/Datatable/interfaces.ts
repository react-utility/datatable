import { IColumn } from "./types";

export interface SortOptions{
    sortArray: any[], 
    stortKey: string, 
    sortDirection?: Sorting,
}

export interface CellProps {
    displayValue: string,
    rest?: any
}

export enum Sorting {
    ASC,
    DESC
}

export interface HeaderProps {
    item: IColumn,
    sortState?: {sortKey: string | null | undefined, isSorted: boolean}
    sortIcon? : React.FC,
    classNames? : IHeaderCss,
    onColumnClick: (isSortOpen: boolean, selectedItem: IColumn, event: React.MouseEvent<HTMLButtonElement>) => void,
    onSortClick: (sortDirection: Sorting, headerItem: IColumn,event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface IHeaderCss {
    header? : string,
    headerInner?: string,
    headerName?: string,
    sortIcon?: string
}


export interface RowProps {
    header: Array<IColumn>,
    dataItem: any,
    index: string,
    rest?: any
}





