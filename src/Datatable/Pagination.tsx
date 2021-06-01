import React, { useState, useRef } from "react";
import { PaginationProps } from "./types";


const Pagination: React.FC<PaginationProps> = (props) => {

    const currentSliceIndex = useRef<{ start: number, end: number }>({ start: 0, end: props.tableOptions!.rowsPerPage!.option[props.tableOptions!.rowsPerPage!.defaultIndex] });
    const [pageState, setPageState] = useState<{ isLast: boolean, isFirst: boolean }>({ isLast: false, isFirst: true });


    const handleOnRowPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let rowPerPage: number = parseInt(event.target.value);
        let data = props.data;
        currentSliceIndex.current = { start: 0, end: rowPerPage };
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
                currentSliceIndex.current = { start: 0, end: rowPerPage };
                setPageState({ isFirst: true, isLast: false });
                props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.defaultIndex);
                break;
            case 'previous':
                startIndex = currentSliceIndex.current.start === 0 ? currentSliceIndex.current.start : currentSliceIndex.current.start - rowPerPage;
                endIndex = startIndex === 0 ? rowPerPage : currentSliceIndex.current.end - rowPerPage;
                if (currentSliceIndex.current.end === data.length) {
                    startIndex = currentSliceIndex.current.end - remainder - rowPerPage;
                    endIndex = currentSliceIndex.current.end - remainder;
                }
                startIndex === 0 ? setPageState({ isFirst: true, isLast: false }) : setPageState({ isFirst: false, isLast: false });

                data = data.slice(startIndex, endIndex);
                currentSliceIndex.current = { start: startIndex, end: endIndex };

                props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.defaultIndex);

                break;
            case 'next':
                startIndex = currentSliceIndex.current.start + rowPerPage;
                endIndex = startIndex + rowPerPage <= data.length ? startIndex + rowPerPage : data.length;

                endIndex === data.length ? setPageState({ isFirst: false, isLast: true }) : setPageState({ isFirst: false, isLast: false });



                data = data.slice(startIndex, endIndex);
                currentSliceIndex.current = { start: startIndex, end: endIndex };

                props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.defaultIndex);
                break;
            case 'last':
                startIndex = data.length - remainder;
                endIndex = data.length;
                data = data.slice(startIndex, endIndex);

                currentSliceIndex.current = { start: startIndex, end: endIndex };
                setPageState({ isFirst: false, isLast: true });
                props.updateRowsPerPage(data, props.tableOptions!.rowsPerPage!.defaultIndex);
                break;

            default:
                break;
        }
    }

    return (
        <div className={props.classNames.pagination}>
            {
                props.tableOptions!.showRowPerPageDropdown &&
                <div className={props.classNames.paginationDropdown}>
                    <p>Rows per page</p>
                    <select onChange={handleOnRowPerPageChange} defaultValue={props.tableOptions?.rowsPerPage?.option[props.tableOptions?.rowsPerPage?.defaultIndex]}>
                        {
                            props.tableOptions?.rowsPerPage?.option.map((number, index) => <option key={'rpp_' + index}>{number}</option>)
                        }
                    </select>
                </div>
            }
            {
                props.tableOptions!.showRowsPerPage && <div className={props.classNames.rowPerPageDisplay}>{currentSliceIndex.current.start} - {currentSliceIndex.current.end} /{props.data.length}</div>
            }

            <div className={props.classNames.paginationButtonGroup}>
                <button className={props.classNames.paginationButton} disabled={pageState.isFirst} onClick={() => { handlePageNavigationClick('first') }}>
                    {
                        props.tableOptions?.paginationIconFirstPage && <props.tableOptions.paginationIconFirstPage />
                    }
                    {
                        !props.tableOptions?.paginationIconFirstPage && <>First Page</>
                    }
                </button>
                <button className={props.classNames.paginationButton}
                    disabled={pageState.isFirst}
                    onClick={() => { handlePageNavigationClick('previous') }}>
                    {
                        props.tableOptions?.paginationIconPrevious && <props.tableOptions.paginationIconPrevious />
                    }
                    {
                        !props.tableOptions?.paginationIconPrevious && <>Previous</>
                    }
                </button>
                <button
                    className={props.classNames.paginationButton}
                    disabled={pageState.isLast}
                    onClick={() => { handlePageNavigationClick('next') }}>
                    {
                        props.tableOptions?.paginationIconNext && <props.tableOptions.paginationIconNext />
                    }
                    {
                        !props.tableOptions?.paginationIconNext && <>Next</>
                    }
                </button>
                <button className={props.classNames.paginationButton}
                    disabled={pageState.isLast}
                    onClick={() => { handlePageNavigationClick('last') }}>
                    {
                        props.tableOptions?.paginationIconLastPage && <props.tableOptions.paginationIconLastPage />
                    }
                    {
                        !props.tableOptions?.paginationIconLastPage && <>Last Page</>
                    }
                </button>
            </div>
        </div>
    )
}

export default Pagination;

/**
 * In Case of Enable Debug
 * console.log('Next is clicked');
 * console.table([{ currentSliceIndex: currentSliceIndex.current.start + '-' + currentSliceIndex.current.end, rowPerPage: rowPerPage, remainder: remainder, startIndex: startIndex, endIndex: endIndex }]);
 */