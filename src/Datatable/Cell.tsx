import React, { useRef, useEffect } from 'react';
import { CellProps } from "./types";
import { addClass, getClassesAsArray, removeClass } from './util/common';

const Cell: React.FC<CellProps> = (props: CellProps) => {
    const cell = useRef<HTMLTableCellElement>(null);

    useEffect(() => {
        if (props.dense!.isDense && props.dense!.denseCss) {
            if (props.dense!.denseCss.length > 0) {
                addClass(cell.current!, getClassesAsArray(props.dense!.denseCss));
            }

        } else {
            if (props.dense!.denseCss) {
                if (props.dense!.denseCss.length > 0) {
                    removeClass(cell.current!, getClassesAsArray(props.dense!.denseCss));
                }
            }
        }
    }, []);

    return (
        <td
            ref={cell}
            className={props.classNames!.cellElelmentCss}
            style={props.customCellStyle!}
        >
            {props.children}
        </td>
    )
}

export default Cell;