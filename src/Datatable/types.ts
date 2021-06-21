import React from "react";
import { ICellElementCss, IColumn, IDataTableOptions, IHeaderElementCss, IPaginationCss } from "./interfaces";
import RowExpansion from "./RowExpansion";

export type TableColumn = IColumn & {
    isSorted?: boolean,
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
    dense?: { isDense: boolean, denseCss: string },
    classNames?: ICellElementCss,
    customCellStyle?: React.CSSProperties,
    children?: React.ReactNode;
}

export enum Sorting {
    ASC,
    DESC
}

export type HeaderProps = {
    item: TableColumn,
    sortState?: { sortKey: string | null | undefined, isSorted: boolean }
    sortIcon?: React.FC,
    dense?: { isDense: boolean, denseCss: string },
    classNames?: IHeaderElementCss,
    onHeaderClick?: (isSortOpen: boolean, selectedItem: TableColumn, event: React.MouseEvent<HTMLButtonElement>) => void,
    onSortIconClick?: (sortDirection: Sorting, headerItem: TableColumn, event: React.MouseEvent) => void
}


export type RowProps = {
    header: Array<IColumn>,
    rowExpansion : {
        enableRowExpansion : boolean, 
        customRowExpansionIcon: {
            show: React.FC<any>,
            hide: React.FC<any>
        },
        onRowExpansionClicked:() => void,
        onRowHideClicked:() => void,
        isRowExpansionDisabled? : (row:any) => boolean,
        onRowExpanded?: React.FC<{row:any}>
    },
    dense: { isDense: boolean, denseCss: string },
    striped: { isStriped: boolean, stripedCss: string },
    onHover: { isHoverRequired: boolean, onHoverCss: string },
    classNames: { rowElementCss: string, cellElementCss: ICellElementCss },
    dataItem: any,
    index: string,
    rowSingleClicked?: (row: any, event: React.MouseEvent<HTMLTableRowElement> | React.TouchEvent<HTMLTableRowElement>) => void,
    rowDoubleClicked?: (row: any, event: React.MouseEvent<HTMLTableRowElement> | React.TouchEvent<HTMLTableRowElement>) => void,
    customRowStyles?: RowStyleCustom[],
}

export type PaginationProps = {
    classNames: IPaginationCss,
    tableOptions: IDataTableOptions,
    data: any[];
    updateRowsPerPage: (data: any[], newIndex: number) => void
}

export type DeepMerge = {
    target: any,
    source: any
}

export type RowsPerPage = {
    option: number[],
    defaultIndex: number
}

export type RowStyleCustom = {
    when: (row: any) => boolean,
    style: (row: any) => React.CSSProperties
}

export type CellStyleCustom = {
    when: (value: any) => boolean,
    style: () => React.CSSProperties
}

export type RowExpansionProps = {
    id? : string,
    rowIsExpanded:(isExpanded: boolean) => void,
    customRowExpansionIcon: {
        show: React.FC<any>,
        hide: React.FC<any>
    },
    isRowExpansionDisabled: boolean
}