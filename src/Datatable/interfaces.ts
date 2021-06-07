import React from "react";
import { HeaderItem, RowsPerPage, Sorting, SortOptions } from "./types";

export interface IDataTableProps {
    columns: IColumn[] | undefined,
    data: any[] | undefined,
    options?: IDataTableOptions,
    classNames?: IDataTableCSS
}

export interface IColumn {
    name?: string,
    selector?: string,
    sortable?: boolean,
    sortIcon?: React.FC<HeaderItem>,
    showColumn?: boolean
}

export interface IDataTableOptions {
    tableId?: string,
    showCaption?: boolean,
    caption?: string,
    customCaption?: React.FC<any>,
    noDataMessage?: string,
    noDataComponent?: React.FC<any>,
    dense?: boolean,
    hideTableHeader?: boolean,
    persistTableHead?: boolean,
    responsive?: boolean,

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
    caption?: string,
    tableWrapper?: string,
    table?: string,
    tableHead?: string,
    tableBody?: string,
    tableFooter?: string,
    tableDense?: string,
    tableResponsive?: string,
    nodata?: string,
    highlightOnHoverClass?: string,
    tableHeaderRowElement?: string,
    tableBodyRowElement?: string,
    headerElement?: IHeaderElementCss,
    cellElement?: ICellElementCss,
    progressbar: IProgressPendingCss
    pagination?: IPaginationCss
}


export interface IHeaderElementCss {
    header?: string,
    headerInner?: string,
    headerButton?: string,
    headerIcon?: string
}

export interface ICellElementCss {
    cell?: string,
    cellInner?: string,
}

export interface IProgressPendingCss {
    progressPendingWrapper: string,
    progressPending: string,
    progressPendingAnimation: string,
    progressPendingCircle: string,
    progressPendingPath: string
}

export interface IPaginationCss {
    pagination?: string,
    paginationDropdown?: string,
    rowPerPageDisplay?: string,
    paginationButtonGroup?: string,
    paginationButton?: string
}


