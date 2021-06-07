import { IDataTableCSS, IDataTableOptions } from "./interfaces"


export const defaultOptions: IDataTableOptions = {
    tableId: Math.floor(Math.random() * 1000).toString(),
    noDataMessage: 'No Data to Display',
    hideTableHeader: false,
    defaultSortAscending: true,
    pagination: false,
    showRowPerPageDropdown: false,
    rowsPerPage: { option: [5, 10, 15, 20], defaultIndex: 0 }
}

export const defaultCss: IDataTableCSS = {
    caption: 'table-caption',
    tableDense: 'table-dense',
    tableResponsive: 'table-responsive',
    nodata: 'table-nodata',
    tableBodyRowElement: '',
    headerElement: {
        header: '',
        headerInner: 'th-inner',
        headerButton: 'button',
        headerIcon: 'icon'
    },
    cellElement: {
        cell: ''
    },
    progressbar: {
        progressPendingWrapper: 'progress-pending-wrapper',
        progressPending: 'progress-pending',
        progressPendingAnimation: 'progress-pending-animation',
        progressPendingCircle: 'progress-pending-circle',
        progressPendingPath: 'progress-pending-path'
    },
    pagination: {
        pagination: 'pagination',
        paginationDropdown: 'pagination-dropdown',
        rowPerPageDisplay: 'pagination-rowsperpage',
        paginationButton: 'button pagination-button',
        paginationButtonGroup: 'pagination-buttonGroup',
    }
}