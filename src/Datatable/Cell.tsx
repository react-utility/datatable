import React, { useRef, useEffect } from 'react';
import { CellProps } from "./types";

const Cell: React.FC<CellProps> = (props: CellProps) => {
    const cell = useRef<HTMLTableCellElement>(null);

    useEffect(() => {
        if (props.dense!.isDense) {
            cell.current!.classList.add(props.dense!.denseCss);
        } else {
            cell.current!.classList.remove(props.dense!.denseCss);
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