import React from "react";
import { IColumn, IDataTableOptions, IHeaderCss, PaginationCss } from "./interfaces";

export type TableColumn = IColumn & {
    isSorted: boolean,
    sortDirection?: Sorting
}

export type HeaderItem = {
    isHeaderClicked: boolean,
    onSortClicked: (sortDirection: Sorting, headerItem: TableColumn, event: React.MouseEvent) => void,
    prevDirection: Sorting,
    isHovered?: boolean,
    props: HeaderProps
}

export type SortOptions = {
    sortArray: any[],
    stortKey: string,
    sortDirection?: Sorting,
}

export type CellProps = {
    displayValue: string,
    rest?: any
}

export enum Sorting {
    ASC,
    DESC
}

export type HeaderProps = {
    item: TableColumn,
    sortState?: { sortKey: string | null | undefined, isSorted: boolean }
    sortIcon?: React.FC,
    classNames?: IHeaderCss,
    onHeaderClick?: (isSortOpen: boolean, selectedItem: TableColumn, event: React.MouseEvent<HTMLButtonElement>) => void,
    onSortIconClick?: (sortDirection: Sorting, headerItem: TableColumn, event: React.MouseEvent) => void
}


export type RowProps = {
    header: Array<IColumn>,
    dataItem: any,
    index: string,
    rest?: any
}

export type PaginationProps = {
    classNames: PaginationCss,
    tableOptions?: IDataTableOptions,
    data: any[];
    updateRowsPerPage: (data: any[], newRowsPerPage: number) => void
}

export type DeepMerge = {
    target: any,
    source: any
}