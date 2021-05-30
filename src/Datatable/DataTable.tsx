import React, { useState, useEffect } from 'react';
import '../index.css';
import { defaultCss, defaultOptions } from './default';
import Header from './Header';
import { Sorting, SortOptions, TableColumn } from './types';
import { IDataTableCSS, IDataTableOptions, IDataTableProps } from './interfaces';
import Row from './Row';
import useSort from './hooks/useSort';
import Pagination from './Pagination';


const DataTable: React.FC<IDataTableProps> = (props) => {

    const UniqueId = '_' + Math.random().toString(36).substr(2, 9);

    const [tableOptions, setTableOptions] = useState<IDataTableOptions>(defaultOptions);
    const [tableCss, setTableCss] = useState<IDataTableCSS>(defaultCss);
    const [tableHeader, setTableHeader] = useState<TableColumn[]>([]);
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
        let newCss = { ...defaultCss, ...props.classNames };
        setTableCss(newCss);
    }, [props.classNames]);

    /**
     * Set Header Data after Initial Render. 
     * Change table Header whenever the props changes  
     */
    useEffect(() => {
        if (props.header) {
            let newHeader: TableColumn[] = props.header!.map((item) => ({ ...item, isSorted: false }));
            setTableHeader(newHeader);
        }
    }, [props.header]);

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

            if (newOptions.pagination) {
                let rowPerPage: number = newOptions.rowsPerPage!.slice(0, 1)[0];
                data = data.slice(0, rowPerPage);
            }

            setTableData(data);
        }
    }, [props.data, props.options]);



    const determineSortFunction = (): ((options: SortOptions) => any[]) => {
        return tableOptions.customSortFunction ? tableOptions.customSortFunction : useSort;
    }


    const handleOnCloumnClick = (isSortOpen: boolean, selectedItem: TableColumn, event: React.MouseEvent<HTMLButtonElement>) => {
        //console.log('From Datatable Handle Column Click is triggered');
        let sortFunction = determineSortFunction();
        setTableHeader(prevState => {
            return prevState.map(item => {
                if (item.selector === selectedItem.selector) {
                    return ({ ...item, isSorted: isSortOpen, sortDirection: Sorting.ASC });
                }
                return ({ ...item, isSorted: false, sortDirection: undefined });
            });
        });
        let newData = [...props.data!];
        setTableData(sortFunction({ sortArray: newData, stortKey: selectedItem.selector!, sortDirection: Sorting.ASC }));

        if (props.options && props.options!.onSort)
            props.options!.onSort!([], Sorting.ASC, event);
    };

    const handleOnSortClick = (sortDirection: Sorting, headerItem: TableColumn) => {
        //console.log('Sorting is called',sortDirection);
        let sortFunction = determineSortFunction();
        setTableHeader(prevState => {
            return prevState.map(item => {
                if (item.selector === headerItem.selector) {
                    return ({ ...item, sortDirection: sortDirection });
                }
                return ({ ...item, sortDirection: undefined });
            });
        });
        let newData = [...props.data!];
        setTableData(sortFunction({ sortArray: newData, stortKey: headerItem.selector!, sortDirection: sortDirection }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let rowPerPage: number = parseInt(event.target.value);
        let sortFunction = determineSortFunction();
        let sortedItem = tableHeader.find(item => item.isSorted);
        let newData = [];
        let data = [...props.data!];
        if (sortedItem) {
            newData = sortFunction({ sortArray: data, stortKey: sortedItem!.selector!, sortDirection: sortedItem!.sortDirection }).slice(0, rowPerPage);
        } else {
            newData = data.slice(0, rowPerPage);
        }
        setTableData(newData);
    }

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            {
                                tableHeader.map((item, index) => {
                                    return (<Header item={item} key={UniqueId + '_' + index + item.selector!} classNames={tableCss.header} onColumnClick={handleOnCloumnClick} onSortClick={handleOnSortClick} />)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((dataItem, index) => {
                                return <Row header={tableHeader} dataItem={dataItem} index={UniqueId + index} key={UniqueId + index} />
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                tableOptions.pagination && <Pagination classNames={tableCss.pagination!} rowsPerPage={tableOptions.rowsPerPage} onRowPerPageChange={handleChangeRowsPerPage} />
            }
        </>
    )
}

export default DataTable;