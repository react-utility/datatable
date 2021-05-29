import { IDataTableCSS, IDataTableOptions } from "./interfaces"


export const defaultOptions : IDataTableOptions = {
    pagination : false,
    rowsPerPage : [10,25,40,60,100]
}

export const defaultCss : IDataTableCSS = {
    header : {
        header : 'header',
        headerInner : 'headerInner',
        headerButton : 'button',
        headerIcon : 'icon'
    },
    pagination : {
        page : 'pagination',
        pageButton : 'button pagination-button',
        pageButtonGroup : 'pagination-buttonGroup',
        select : 'pagination-select'
    }
}