import React, { useState, useEffect, useRef } from 'react';
import '../index.css';
import { defaultCss, defaultOptions } from './default';
import Header from './Header';
import { Sorting, SortOptions, TableColumn } from './types';
import { IDataTableCSS, IDataTableOptions, IDataTableProps } from './interfaces';
import Row from './Row';
import useSort from './hooks/useSort';
import Progress from './Progress';
import Pagination from './Pagination';
import useDeepMerge from './hooks/useDeepMerge';


const DataTable: React.FC<IDataTableProps> = (props) => {

    const UniqueId = '_' + Math.random().toString(36).substr(2, 9);
    const currentSortedData = useRef<any[]>([]);
    const [tableOptions, setTableOptions] = useState<IDataTableOptions>(defaultOptions);
    const [tableCss, setTableCss] = useState<IDataTableCSS>(defaultCss);
    const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);

    /**
     * Set the table options by merging default options and props options to TableOptions.
     * Re-render the table if props.options changes
     */
    useEffect(() => {
        let newOptions = { ...defaultOptions, ...props.options };
        setTableOptions(newOptions);
    }, [props.options]);

    /**
     * Set the table css by merging default css and props classnames to TableCss.
     * Re-render the table if props.classnames changes.
     */
    useEffect(() => {
        let newCss = useDeepMerge({ source: props.classNames, target: defaultCss });
        setTableCss(newCss);
    }, [props.classNames]);

    /**
     * Set Header Data after Initial Render. 
     * Change table Header whenever the props changes  
     */
    useEffect(() => {
        if (props.columns) {
            let newHeader: TableColumn[] = props.columns!.map((item) => ({ ...item, isSorted: false }));
            setTableColumns(newHeader);
        }
    }, [props.columns]);

    /**
     * Set Table Data after Initial Render. 
     * Change table data whenever the props changes for props.data
     */
    useEffect(() => {
        if (props.data) {
            let data = [...props.data];
            let newOptions = { ...defaultOptions, ...props.options };

            if (newOptions.defaultSortHeader!) {
                let sortFunction = determineSortFunction();
                if (newOptions.defaultSortAscending === undefined || newOptions.defaultSortAscending) {
                    data = sortFunction({ sortArray: data, stortKey: newOptions.defaultSortHeader!, sortDirection: Sorting.ASC });
                } else {
                    data = sortFunction({ sortArray: data, stortKey: newOptions.defaultSortHeader!, sortDirection: Sorting.DESC });
                }
            }
            currentSortedData.current = data;

            if (newOptions.pagination) {
                let rowPerPage: number = newOptions.rowsPerPage!.option[newOptions.rowsPerPage!.defaultIndex];
                data = data.slice(0, rowPerPage);
            }

            setTableData(data);
        }
    }, [props.data, props.options]);


    const determineSortFunction = (): ((options: SortOptions) => any[]) => {
        return tableOptions.customSortFunction ? tableOptions.customSortFunction : useSort;
    }


    const handleOnHeaderClick = (isSortOpen: boolean, selectedItem: TableColumn, event: React.MouseEvent<HTMLButtonElement>) => {
        let sortFunction = determineSortFunction();
        setTableColumns(prevState => {
            return prevState.map(item => {
                if (item.selector === selectedItem.selector) {
                    return ({ ...item, isSorted: isSortOpen, sortDirection: Sorting.ASC });
                }
                return ({ ...item, isSorted: false, sortDirection: undefined });
            });
        });
        let data = [...props.data!];
        data = sortFunction({ sortArray: data, stortKey: selectedItem.selector!, sortDirection: Sorting.ASC });
        currentSortedData.current = data;
        if (tableOptions.pagination) {
            let rowPerPage: number = tableOptions.rowsPerPage!.option[tableOptions.rowsPerPage!.defaultIndex];
            data = data.slice(0, rowPerPage);
        }
        setTableData(data);

        if (tableOptions.onSort)
            tableOptions.onSort!([], Sorting.ASC, event);
    };

    const handleOnSortIconClick = (sortDirection: Sorting, headerItem: TableColumn) => {
        //console.log('Sorting is called',sortDirection);
        let sortFunction = determineSortFunction();
        setTableColumns(prevState => {
            return prevState.map(item => {
                if (item.selector === headerItem.selector) {
                    return ({ ...item, sortDirection: sortDirection });
                }
                return ({ ...item, sortDirection: undefined });
            });
        });

        let data = [...props.data!];
        data = sortFunction({ sortArray: data, stortKey: headerItem.selector!, sortDirection: sortDirection });
        currentSortedData.current = data;
        if (tableOptions.pagination) {
            let rowPerPage: number = tableOptions.rowsPerPage!.option[tableOptions.rowsPerPage!.defaultIndex];
            data = data.slice(0, rowPerPage);
        }
        setTableData(data);
    };

    const handleUpdateRowsPerPage = (data: any[], newIndex: number) => {
        setTableData(data);
        setTableOptions(prevOptions => {
            prevOptions.rowsPerPage!.defaultIndex = newIndex;
            return prevOptions;
        })
    }

    return (
        <>
            <div>
                <table id={tableOptions.tableId}>
                    {
                        tableOptions.showCaption &&
                        <>
                            {
                                !tableOptions.customCaption && <caption>Movie List</caption>
                            }
                            {
                                tableOptions.customCaption && <tableOptions.customCaption />
                            }
                        </>
                    }
                    <thead>
                        <tr>
                            {
                                tableColumns.map((item, index) => {
                                    return (<Header item={item} key={UniqueId + '_' + index + item.selector!} classNames={tableCss.header} onHeaderClick={handleOnHeaderClick} onSortIconClick={handleOnSortIconClick} />)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableOptions.showProgressPending &&
                            <tr>
                                <td colSpan={tableColumns.length}>
                                    {
                                        tableOptions.customProgressPendingComponent && <tableOptions.customProgressPendingComponent />
                                    }
                                    {
                                        !tableOptions.customProgressPendingComponent && <Progress classNames={tableCss.progressbar} />
                                    }
                                </td>
                            </tr>
                        }
                        {
                            !tableOptions.showProgressPending &&
                            tableData.map((dataItem, index) => {
                                return <Row header={tableColumns} dataItem={dataItem} index={UniqueId + index} key={UniqueId + index} />
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                tableOptions.pagination && <Pagination
                    classNames={tableCss.pagination!}
                    tableOptions={tableOptions}
                    data={[...currentSortedData.current]}
                    updateRowsPerPage={handleUpdateRowsPerPage} />
            }
        </>
    )
}

export default DataTable;