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
import usePrevious from './hooks/usePrevious';


const DataTable: React.FC<IDataTableProps> = (props) => {

    const UniqueId = '_' + Math.random().toString(36).substr(2, 9);
    const currentSortedData = useRef<any[]>([]);
    const [tableOptions, setTableOptions] = useState<IDataTableOptions>(defaultOptions);
    const [tableCss, setTableCss] = useState<IDataTableCSS>(defaultCss);
    const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);

    const previousSelection = useRef<any[]>([]);
    /**
     * Set the table options by merging default options and props options to TableOptions.
     * Re-render the table if props.options changes
     */
    useEffect(() => {
        let newOptions = { ...defaultOptions, ...props.options };
        setTableOptions(newOptions);
        //console.log('Options is fired', newOptions);
    }, [props.options]);

    /**
     * Set the table css by merging default css and props classnames to TableCss.
     * Re-render the table if props.classnames changes.
     */
    useEffect(() => {
        let target = JSON.parse(JSON.stringify(defaultCss));
        let newCss = useDeepMerge({ source: props.classNames, target: target });
        setTableCss(newCss);
        //console.log('CSS is fired');
    }, [props.classNames]);

    /**
     * Set Header Data after Initial Render. 
     * Change table Header whenever the props changes  
     */
    useEffect(() => {
        if (props.columns) {
            let newHeader: TableColumn[] = props.columns!.map((item) => ({ ...item, isSorted: false, showColumn: true }));
            if(props.options!.enableRowSelection || props.options!.enableRowExpansion){
                let rowDefaultActions : TableColumn[] = [{name:' ',selector:'rowDefaultActions', showColumn: true}];
                newHeader = [...rowDefaultActions,...newHeader];
            }

            /* if(props.options!.enableRowSelection){
                let rowExpansionHeader : TableColumn[] = [{name:' ',selector:'selection', showColumn: true}];
                newHeader = [...rowExpansionHeader,...newHeader];
            }
            if(props.options!.enableRowExpansion){
                let rowExpansionHeader : TableColumn[] = [{name:' ',selector:'expansion', showColumn: true}];
                newHeader = [...rowExpansionHeader,...newHeader];
            } */
            setTableColumns(newHeader);
        }
        //console.log('Header is fired');
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
        //console.log('Data is fired');
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

    const handleOnSearch = (searchData : string, selector : string ) => {
        let data = [...props.data!];
        let newData = data.filter(dataitem => {
            let dataToCompare = dataitem[selector].toString();
            if(dataToCompare.search(searchData) >= 0)
                return dataitem;
        });
        console.log(newData);
        setTableData(newData);
    }


    const handleUpdateRowsPerPage = (data: any[], newIndex: number) => {
        setTableData(data);
        setTableOptions(prevOptions => {
            prevOptions.rowsPerPage!.defaultIndex = newIndex;
            return prevOptions;
        })
    }

    const handleRowSelection = (row: any[], event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            previousSelection.current.push(row);
        }else{
            let newRows = previousSelection.current.filter(item => item !== row);
            previousSelection.current = newRows;
        }
        props.options!.onRowSelected!(previousSelection.current,event);
    }

    return (
        <>
            {
                tableOptions.showCaption &&
                <>
                    {
                        !tableOptions.customCaption && <div className={tableCss.caption}>{tableOptions.caption!}</div>
                    }
                    {
                        tableOptions.customCaption && <tableOptions.customCaption />
                    }
                </>
            }
            <div className={tableOptions.responsive ? tableCss.tableResponsive + ' ' + tableCss.tableWrapper : tableCss.tableWrapper}>
                <table id={tableOptions.tableId} className={tableCss.table}>
                    {
                        !tableOptions.hideTableHeader &&
                        <thead className={tableCss.tableHead}>
                            <tr className={tableCss.tableHeaderRowElement}>
                                {
                                    tableColumns.map((item, index) => {
                                        if(item.showColumn){
                                            return (<Header item={item} key={UniqueId + '_' + index + item.selector!} classNames={tableCss.headerElement} onHeaderClick={handleOnHeaderClick} onSortIconClick={handleOnSortIconClick} dense={{ isDense: tableOptions.dense!, denseCss: tableCss.tableDense! }} onSearch={handleOnSearch} />)
                                        }
                                        return
                                    })
                                }
                            </tr>
                        </thead>
                    }
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
                            !tableOptions.showProgressPending && tableData.length > 0 &&
                            tableData.map((dataItem, index) => {
                                return <Row
                                    header={tableColumns}
                                    dataItem={dataItem}
                                    index={UniqueId + index}
                                    key={UniqueId + index}
                                    classNames={
                                        { 
                                            rowElementCss: tableCss.tableBodyRowElement!, 
                                            cellElementCss: tableCss.cellElement!,
                                            rowDefaultActions: tableCss.rowDefaultActions!,
                                            rowExpansion: tableCss.rowExpansion!,
                                            rowSelection: tableCss.rowSelection!,
                                        }
                                    } 
                                    dense={{ isDense: tableOptions.dense!, denseCss: tableCss.tableDense! }}
                                    striped={{ isStriped: tableOptions.showTableStriped!, stripedCss: tableCss.tableStriped! }}
                                    onHover={{ isHoverRequired: tableOptions.highlightOnHover!, onHoverCss: tableCss.highlightOnHoverClass! }}
                                    rowSingleClicked={tableOptions.onRowClicked}
                                    rowDoubleClicked={tableOptions.onRowDoubleClicked}
                                    customRowStyles={tableOptions.customRowStyles}
                                    rowExpansion={
                                        {
                                            enableRowExpansion: tableOptions.enableRowExpansion!,
                                            customRowExpansionIcon : {
                                                show: tableOptions.customRowExpansionIcon!.show!, 
                                                hide: tableOptions.customRowExpansionIcon!.hide!,
                                            }, 
                                            onRowExpansionClicked: tableOptions.onRowExpansionClicked!, 
                                            onRowHideClicked: tableOptions.onRowHideClicked!, 
                                            isRowExpansionDisabled: tableOptions.isRowExpansionDisabled!, 
                                            onRowExpanded : tableOptions.onRowExpanded!
                                        }
                                    }

                                    rowSelection={{
                                        enableRowSelection : tableOptions.enableRowSelection!,
                                        onRowSelected : handleRowSelection
                                    }}
                                />
                            })
                        }
                        {
                            !tableOptions.showProgressPending && tableData.length === 0 && !tableOptions.noDataComponent &&
                            <tr>
                                <td colSpan={tableColumns.length} className={tableCss.nodata}>{tableOptions.noDataMessage}</td>
                            </tr>
                        }
                        {
                            !tableOptions.showProgressPending && tableData.length === 0 && tableOptions.noDataComponent &&
                            <>
                                <tableOptions.noDataComponent />
                            </>
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