import React, { useState, useEffect, useRef } from "react";
import { PaginationProps } from "./types";


const Pagination: React.FC<PaginationProps> = (props) => {

    const currentSliceIndex = useRef<number>(0);
    const [pageState, setPageState] = useState<{ isLast: boolean, isFirst: boolean }>({ isLast: false, isFirst: true });

    useEffect(() => {
    });

    const handleOnRowPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let rowPerPage: number = parseInt(event.target.value);
        let data = props.data;
        data = data.slice(0, rowPerPage);
        props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.option.findIndex(item => item === rowPerPage));
    }

    const handlePageNavigationClick = (action: string) => {
        let rowPerPage = props.tableOptions!.rowsPerPage!.option[props.tableOptions!.rowsPerPage!.defaultIndex];
        let data = props.data;
        let startIndex = 0;
        let endIndex = 0;
        let remainder = data.length % rowPerPage;
        switch (action) {
            case 'first':
                data = data.slice(0, rowPerPage);
                currentSliceIndex.current = 0;
                setPageState({ isFirst: true, isLast: false })
                props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.defaultIndex);
                break;
            case 'previous':
                startIndex = currentSliceIndex.current - rowPerPage === rowPerPage ? 0 : currentSliceIndex.current - rowPerPage;
                endIndex = startIndex === 0 ? rowPerPage : currentSliceIndex.current;
                if (currentSliceIndex.current === data.length) {
                    startIndex = currentSliceIndex.current - remainder - rowPerPage;
                    endIndex = currentSliceIndex.current - remainder;
                }
                startIndex === 0 ? setPageState({ isFirst: true, isLast: false }) : setPageState({ isFirst: false, isLast: false });
                data = data.slice(startIndex, endIndex);
                currentSliceIndex.current = startIndex;
                props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.defaultIndex);

                break;
            case 'next':
                startIndex = currentSliceIndex.current;
                if (currentSliceIndex.current === 0) {
                    startIndex = rowPerPage;
                }
                endIndex = startIndex + rowPerPage <= data.length ? startIndex + rowPerPage : data.length;

                endIndex === data.length ? setPageState({ isFirst: false, isLast: true }) : setPageState({ isFirst: false, isLast: false });
                data = data.slice(startIndex, endIndex);
                currentSliceIndex.current = endIndex;
                props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.defaultIndex);
                break;
            case 'last':
                data = data.slice(data.length - remainder, data.length);
                currentSliceIndex.current = data.length;
                setPageState({ isFirst: false, isLast: true })
                props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.defaultIndex);
                break;

            default:
                break;
        }
    }

    return (
        <div className={props.classNames.page}>
            <p>Rows per page</p>
            <select className={props.classNames.select} onChange={handleOnRowPerPageChange} defaultValue={props.tableOptions?.rowsPerPage?.option[props.tableOptions?.rowsPerPage?.defaultIndex]}>
                {
                    props.tableOptions?.rowsPerPage?.option.map((number, index) => <option key={'rpp_' + index}>{number}</option>)
                }
            </select>

            <div className={props.classNames.pageButtonGroup}>
                <button className={props.classNames.pageButton} disabled={pageState.isFirst} onClick={() => { handlePageNavigationClick('first') }}>First Page</button>
                <button className={props.classNames.pageButton} disabled={pageState.isFirst} onClick={() => { handlePageNavigationClick('previous') }}>Previous</button>
                <button className={props.classNames.pageButton} disabled={pageState.isLast} onClick={() => { handlePageNavigationClick('next') }}>Next</button>
                <button className={props.classNames.pageButton} disabled={pageState.isLast} onClick={() => { handlePageNavigationClick('last') }}>Last Page</button>
            </div>
        </div>
    )
}

export default Pagination;