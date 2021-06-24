import React, { useState,useRef, useEffect } from 'react';
import Cell from './Cell';
import RowExpansion from './RowExpansion';
import RowSelection from './RowSelection';
import { CellStyleCustom, RowProps } from './types';
import { addClass, removeClass, getClassesAsArray } from './util/common';


const Row: React.FC<RowProps> = (props: RowProps) => {
    const [showExpandedRow, setShowExpandedRow] = useState(false);
    
    const row = useRef<HTMLTableRowElement>(null);
    const clickCount = useRef<number>(0);
    const delay: number = 300;
    const ignoreRowClick = props.rowSelection.enableRowSelection || props.rowExpansion.enableRowExpansion;

    useEffect(() => {
        if (props.striped?.isStriped && props.striped!.stripedCss) {
            if (props.striped!.stripedCss.length > 0) {
                addClass(row.current!, getClassesAsArray(props.striped!.stripedCss));
            }
        } else {
            if (props.striped!.stripedCss) {
                if (props.striped!.stripedCss.length > 0) {
                    removeClass(row.current!, getClassesAsArray(props.striped!.stripedCss));
                }
            }
        }
        if (props.onHover!.isHoverRequired && props.onHover!.onHoverCss) {
            if (props.onHover!.onHoverCss.length > 0) {
                addClass(row.current!, getClassesAsArray(props.onHover!.onHoverCss));
            }
        } else {
            if (props.onHover!.onHoverCss) {
                if (props.onHover!.onHoverCss.length > 0) {
                    removeClass(row.current!, getClassesAsArray(props.onHover!.onHoverCss));
                }
            }
        }
    }, [])

    const handleOnClick = (dataItem: any, event: React.MouseEvent<HTMLTableRowElement> | React.TouchEvent<HTMLTableRowElement>) => {
        if(!ignoreRowClick){
            clickCount.current += 1;
            setTimeout(() => {
                if (clickCount.current === 1) {
                    if(props.rowSingleClicked){
                        props.rowSingleClicked!(dataItem, event);
                    }
                } else if (clickCount.current === 2) {
                    if(props.rowDoubleClicked){
                        props.rowDoubleClicked!(dataItem, event);
                    }
                }
                clickCount.current = 0;
            }, delay);
        }
    }

    const conditionalRowStyle = (row: any): React.CSSProperties => {
        let customStyle: React.CSSProperties = {};
        if (props.customRowStyles) {
            props.customRowStyles!.forEach((crs) => {
                if (!crs.when || typeof crs.when !== 'function') {
                    throw new Error('"when" is a delcrative function and must be defined in row formatting.');
                }
                if (!crs.style || typeof crs.style !== 'function') {
                    throw new Error('"style" is a delcrative function and must be defined in row formatting.');
                }
                if (crs.when(row)) {
                    customStyle = crs.style(row);
                }
            });
        }
        return customStyle;
    }

    const conditionalCellStyle = (value: any, customStyle: CellStyleCustom[]): React.CSSProperties => {
        let cellStyle: React.CSSProperties = {};
        if (customStyle) {
            customStyle.forEach((cs) => {
                if (!cs.when || typeof cs.when !== 'function') {
                    throw new Error('"when" is a delcrative function and must be defined in custom cell formatting.');
                }
                if (!cs.style || typeof cs.style !== 'function') {
                    throw new Error('"style" is a delcrative function and must be defined in custom cell formatting.');
                }
                if (cs.when(value)) {
                    cellStyle = cs.style();
                }
            });
        }
        return cellStyle;
        //displayValue={props.dataItem[item.selector!]}
    }

    const handleOnRowExpansion = (isExpanded: boolean) => {
        setShowExpandedRow(isExpanded);
        isExpanded ? props.rowExpansion.onRowExpansionClicked ? props.rowExpansion.onRowExpansionClicked() : undefined : props.rowExpansion.onRowHideClicked ? props.rowExpansion.onRowHideClicked() : undefined;
    }
    
    const onRowSelection = (rows: any, isSelected:boolean, event?: React.ChangeEvent<HTMLInputElement>) => {
        if(props.rowSelection.highlightOnRowSelect && isSelected){
            addClass(row.current!, getClassesAsArray(props.classNames.onRowSelectHighlight));
        }else{
            if (props.classNames.onRowSelectHighlight.length > 0) {
                removeClass(row.current!, getClassesAsArray(props.classNames.onRowSelectHighlight));
            }
        }

        props.rowSelection.onRowSelected(rows,isSelected,event);
    }

    const getSelectionClassName = () : string => {
        if(props.rowSelection.enableRowSelection && props.rowExpansion.enableRowExpansion) {
            return props.classNames.rowDefaultActions;
        }
        return 'first-item-nopadding';
    }

    return (
        <>
            <tr key={props.index}
                className={props.classNames.rowElementCss}
                ref={row}
                onClick={handleOnClick.bind(this, props.dataItem)}
                style={conditionalRowStyle(props.dataItem)}
            >
                {
                    props.header.map((item, index) => {
                        if(item.selector==="rowDefaultActions" ){
                            return (
                                <Cell
                                    key={index + item.selector!}
                                    classNames={props.classNames.cellElementCss}
                                    dense={props.dense}
                                >
                                    <div className={getSelectionClassName()}>
                                        {
                                            props.rowSelection.enableRowSelection && 
                                            <RowSelection 
                                                id={index + "_rowSelection"} 
                                                classNames={props.classNames.rowSelectionComponent} 
                                                row={props.dataItem}
                                                selectAll={props.rowSelection.selectAll}
                                                isRowSelectionDisabled={props.rowSelection.isRowSelectionDisabled!}
                                                isRowSelectionHidden={props.rowSelection.isRowSelectionHidden!}
                                                customRowSelection={props.rowSelection.customRowSelection}
                                                onRowSelection={onRowSelection}
                                            />
                                        }
                                        {
                                            props.rowExpansion.enableRowExpansion && 
                                            <RowExpansion 
                                                id={index + "_rowExpansion"} 
                                                rowIsExpanded={handleOnRowExpansion}
                                                classNames={props.classNames.rowExpansion}
                                                customRowExpansionIcon={
                                                    {
                                                        show:props.rowExpansion.customRowExpansionIcon.show,
                                                        hide:props.rowExpansion.customRowExpansionIcon.hide
                                                    }
                                                }
                                                isRowExpansionDisabled={props.rowExpansion.isRowExpansionDisabled ? props.rowExpansion.isRowExpansionDisabled(props.dataItem) : false}
                                            />
                                        }
                                    </div>
                                    
                                </Cell>
                            )
                        }
                        
                        return (
                            <Cell
                                key={index + item.selector!}
                                classNames={props.classNames.cellElementCss}
                                dense={props.dense}
                                customCellStyle={conditionalCellStyle(props.dataItem[item.selector!], item.customCellStyles!)}>
                                {
                                    !item.customCell && <>{props.dataItem[item.selector!]}</>
                                }
                                {item.customCell && <item.customCell row={props.dataItem} selector={item.selector}/>}
                            </Cell>
                        )
                    })
                }
            </tr>
            {
                showExpandedRow && 
                <tr>
                    <td colSpan={props.header.length} className="row-expanded-area">
                        {
                            props.rowExpansion.onRowExpanded && < props.rowExpansion.onRowExpanded row={props.dataItem}/>
                        }
                    </td>
                </tr>
            }
        </>
        

    )
}

export default Row;