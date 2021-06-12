import React, { useRef, useEffect } from 'react';
import Cell from './Cell';
import { CellStyleCustom, RowProps } from './types';


const Row: React.FC<RowProps> = (props: RowProps) => {
    const row = useRef<HTMLTableRowElement>(null);
    const clickCount = useRef<number>(0);
    const delay: number = 300;

    useEffect(() => {
        if (props.striped?.isStriped) {
            row.current?.classList.add(props.striped!.stripedCss);
        } else {
            row.current?.classList.remove(props.striped!.stripedCss);
        }
        if (props.onHover!.isHoverRequired) {
            row.current?.classList.add(props.onHover!.onHoverCss);
        } else {
            row.current?.classList.remove(props.onHover!.onHoverCss);
        }
    }, [])

    const handleOnClick = (dataItem: any, event: React.MouseEvent<HTMLTableRowElement> | React.TouchEvent<HTMLTableRowElement>) => {
        clickCount.current += 1;
        setTimeout(() => {
            if (clickCount.current === 1) {
                props.rowSingleClicked!(dataItem, event);
            } else if (clickCount.current === 2) {
                props.rowDoubleClicked!(dataItem, event);
            }
            clickCount.current = 0;
        }, delay);
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

    return (
        <tr key={props.index}
            className={props.classNames.rowElementCss}
            ref={row}
            onClick={handleOnClick.bind(this, props.dataItem)}
            style={conditionalRowStyle(props.dataItem)}
        >
            {
                props.header.map((item, index) => {
                    return (
                        <Cell
                            key={index + item.selector!}
                            classNames={props.classNames.cellElementCss}
                            dense={props.dense}
                            customCellStyle={conditionalCellStyle(props.dataItem[item.selector!], item.customCellStyles!)}>
                            {
                                !item.formatting && <>{props.dataItem[item.selector!]}</>
                            }
                            {item.formatting && <item.formatting row={props.dataItem} />}
                        </Cell>
                    )
                })
            }
        </tr>

    )
}

export default Row;