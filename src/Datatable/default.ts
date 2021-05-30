import { IDataTableCSS, IDataTableOptions } from "./interfaces"


export const defaultOptions: IDataTableOptions = {
    defaultSortAscending: true,
    pagination: false,
    rowsPerPage: { option: [5, 10, 15, 20], defaultIndex: 0 }
}

export const defaultCss: IDataTableCSS = {
    header: {
        header: 'header',
        headerInner: 'headerInner',
        headerButton: 'button',
        headerIcon: 'icon'
    },
    pagination: {
        page: 'pagination',
        pageButton: 'button pagination-button',
        pageButtonGroup: 'pagination-buttonGroup',
        select: 'pagination-select'
    }
}