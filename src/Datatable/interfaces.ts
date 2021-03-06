import { HeaderItem, Sorting, SortOptions } from "./types";

export interface IDataTableProps {
    header: IColumn[] | undefined,
    data: any[] | undefined,
    options?: IDataTableOptions,
    classNames? : IDataTableCSS
}

export interface IColumn {
    name?: string,
    selector?: string,
    sortable?: boolean,
    sortIcon? : React.FC<HeaderItem>
}

export interface IDataTableOptions{
    defaultSortHeader? : string,
    defaultSortAscending? : boolean,
    onSort? : (column : any[], sortDirection: Sorting, event: React.MouseEvent<HTMLButtonElement>) => void,
    customSortFunction? : (options:SortOptions) => any[],
}

export interface IDataTableCSS {
    highlightOnHoverClass?: string,
    header?: IHeaderCss,
}

export interface IHeaderCss {
    header? : string,
    headerInner?: string,
    headerButton?: string,
    headerIcon?: string
}



