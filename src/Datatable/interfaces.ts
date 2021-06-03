import React from "react";
import { HeaderItem, Sorting, SortOptions } from "./types";

export interface IDataTableProps {
    header: IColumn[] | undefined,
    data: any[] | undefined,
    options?: IDataTableOptions,
    classNames?: IDataTableCSS
}

export interface IColumn {
    name?: string,
    selector?: string,
    sortable?: boolean,
    sortIcon?: React.FC<HeaderItem>
}

export interface IDataTableOptions {
    pagination?: boolean,
    paginationServer?: boolean,
    showRowPerPageDropdown?: boolean,
    showRowsPerPage?: boolean,
    rowsPerPage?: RowsPerPage,
    paginationIconFirstPage?: React.FC<any>,
    paginationIconLastPage?: React.FC<any>,
    paginationIconNext?: React.FC<any>,
    paginationIconPrevious?: React.FC<any>,
    customRowPerPageDropdown?: React.FC<{ className?: string, updateRows: (currentSelectedIndex: number) => void, rowsPerPage?: RowsPerPage }>,
    customPagination?: React.FC<any>,
    onPaginationPageChange?: () => void,
    defaultSortHeader?: string,
    defaultSortAscending?: boolean,
    onSort?: (column: any[], sortDirection: Sorting, event: React.MouseEvent<HTMLButtonElement>) => void,
    customSortFunction?: (options: SortOptions) => any[],
    showProgressPending?: boolean,
    customProgressPendingComponent?: React.FC,
}

export interface IDataTableCSS {
    highlightOnHoverClass?: string,
    header?: IHeaderCss,
    progressbar: IProgressPendingCss
    pagination?: PaginationCss
}

export interface PaginationCss {
    pagination?: string,
    paginationDropdown?: string,
    rowPerPageDisplay?: string,
    paginationButtonGroup?: string,
    paginationButton?: string
}
export interface IHeaderCss {
    header?: string,
    headerInner?: string,
    headerButton?: string,
    headerIcon?: string
}

export interface IProgressPendingCss {
    progressPendingWrapper: string,
    progressPending: string,
    progressPendingAnimation: string,
    progressPendingCircle: string,
    progressPendingPath: string
}
export interface RowsPerPage {
    option: number[],
    defaultIndex: number
}

