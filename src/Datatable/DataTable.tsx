import React, { useState, useEffect } from 'react';
import '../index.css';
import { defaultOptions } from './default';

import Header from './Header';
import usePagination from './hooks/usePagination';
import useSort from './hooks/useSort';
import { Sorting } from './interfaces';
import Row from './Row';
import { IColumn, IDataTableOptions, IDataTableProps } from './types';


const DataTable : React.FC<IDataTableProps> = (props) => {
    //console.log('Rendering Datatable since props has changed',props);
    const [currentSortedItem,setCurrentSortedItem] = useState<{sortKey: string | null | undefined, isSorted: boolean}>({sortKey: null, isSorted: false});
    const [tableHeader, setTableHeader] = useState<Array<IColumn>>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [tableOptions, setTableOptions] = useState<IDataTableOptions>(defaultOptions);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(tableOptions.pageNumber![0]);


    const sortFunction = tableOptions.customSortFunction ? tableOptions.customSortFunction : useSort;

    useEffect(() => {
        let options = {...defaultOptions,...props.options}; 
        setTableOptions(options);
    },[props.options])

    useEffect(() => {
        if(props.header && props.header !== null && props.header.length > 0){
            /* let newHeader = props.header?.map((item) => ({ ...item, isSortOpen: false }));
            if(newHeader){
                setTableHeader(newHeader);
            } */
            setTableHeader(props.header);
        }
    }, [props.header]);

    useEffect(() => {
        if(props.data && props.data !== null && props.data.length > 0) {
            console.log(props.options?.defaultSortHeader,props.options?.defaultSortAsc);

            if(props.options?.defaultSortHeader){
                if(props.options?.defaultSortAsc === undefined){
                    setTableData(sortFunction({sortArray : props.data, stortKey: props.options.defaultSortHeader, sortDirection: Sorting.ASC}));
                }else{
                    if(props.options?.defaultSortAsc){
                        setTableData(sortFunction({sortArray : props.data, stortKey: props.options.defaultSortHeader, sortDirection: Sorting.ASC}));
                    }else{
                        setTableData(sortFunction({sortArray : props.data, stortKey: props.options.defaultSortHeader, sortDirection: Sorting.DESC}));
                    }
                }
            }else{
                setTableData(props.data);
            }
            setTableOptions({...tableOptions, showProgressPending : false});
        }
    }, [props.data]);


    const [setPage,isFirst,isLast,data] = usePagination({currentArray : tableData, currentPage: currentPageNumber});
    //console.log({isFirst,isLast,totalRows,data});

    if(tableHeader.length === 0){
        return (<div>NoHeader</div>)
    }

    const handleColumnClick = (isSortOpen : boolean, selectedItem: IColumn, event: React.MouseEvent<HTMLButtonElement> ) => {

        setCurrentSortedItem(prevstate => {
            if(prevstate.sortKey === null || prevstate.sortKey === selectedItem.selector){
                return {sortKey:selectedItem.selector, isSorted:!isSortOpen}
            }
            return {sortKey:selectedItem.selector, isSorted:true};
        });

        if(props.data){
            let newData = [...props.data];
            setTableData(sortFunction({sortArray : newData, stortKey: selectedItem.selector!}));
        }

        if(props.options && props.options.onSort){
            props.options!.onSort([],Sorting.ASC,event);
        }
        
    }

    const handleSorting = (sortDirection: Sorting, headerItem: IColumn ) => {
        if(props.data){
            let newData = [...props.data];
            setTableData(sortFunction({sortArray : newData, stortKey: headerItem.selector!, sortDirection: sortDirection}));
        }
    }

    return(
        <>
            <div className="overflow-x-auto">
                <div className="w-max">
                    <table className="mt-8">
                        <thead>
                            <tr>
                                {
                                    tableHeader.length > 0 &&
                                    tableHeader.map((item) => {
                                        return (<Header item={item} key={item.selector} sortState={currentSortedItem} onColumnClick={handleColumnClick} onSortClick={handleSorting} classNames={props.classNames!.header}/>)
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableOptions.showProgressPending && 
                                <tr>
                                    <td colSpan={tableHeader.length}>
                                        {
                                            tableOptions.customProgressPendingComponent && 
                                            <tableOptions.customProgressPendingComponent />
                                        }
                                        {
                                            !tableOptions.customProgressPendingComponent && 
                                            <>
                                                Loading... {JSON.stringify(tableOptions)}
                                            </>
                                        }
                                    </td>
                                </tr>
                            }
                            {
                                !tableOptions.showProgressPending && 
                                data.map((dataItem, index) => {
                                    return (<Row header={tableHeader} dataItem={dataItem} index={index + ''} key={index} />)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 flex items-center space-x-12">
                <select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setCurrentPageNumber(parseInt(e.target.value));
                    }}
                >
                    {
                        tableOptions.pageNumber!.map((item, index) => {
                            return (
                                <option key={index + 'pageNumber'} value={item}>{item}</option>
                            )
                        })
                    }
                </select>
                <div className="flex items-center space-x-3">
                    <button 
                        disabled={isFirst}
                        onClick={() => {
                            setPage();
                        }}
                        className="disabled:opacity-30"
                    >Fist Page</button>
                    <button 
                        disabled={isFirst}
                        onClick={() => {
                            setPage('previous');
                        }}
                        className="disabled:opacity-30"
                    >Previous</button>
                    <button 
                        disabled={isLast}
                        onClick={() => {
                            setPage('next');
                        }}
                        className="disabled:opacity-30"
                    >Next</button>
                    <button 
                        disabled={isLast}
                        onClick={() => {
                            setPage('last');
                        }}
                        className="disabled:opacity-30"
                    >Last Page</button>
                </div>
            </div>
        </>
    )
}

export default DataTable;