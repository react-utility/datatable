import { IDataTableCSS, IDataTableOptions } from "./interfaces"


export const defaultOptions: IDataTableOptions = {
    defaultSortAscending: true,
    pagination: false,
    showRowPerPageDropdown: false,
    rowsPerPage: { option: [5, 10, 15, 20], defaultIndex: 0 }
}

export const defaultCss: IDataTableCSS = {
    header: {
        header: 'header',
        headerInner: 'headerInner',
        headerButton: 'button',
        headerIcon: 'icon'
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