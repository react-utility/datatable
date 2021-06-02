import { IDataTableCSS, IDataTableOptions } from "./interfaces"


export const defaultOptions: IDataTableOptions = {

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
    }
}