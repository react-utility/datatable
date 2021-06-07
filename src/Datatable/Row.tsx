import React, { useRef, useEffect } from 'react';
import Cell from './Cell';
import { RowProps } from './types';


const Row: React.FC<RowProps> = (props: RowProps) => {
    const row = useRef<HTMLTableRowElement>(null);


    useEffect(() => {
        //console.log('I am getting called');
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
    })


    return (
        <tr key={props.index}
            className={props.classNames.rowElementCss}
            ref={row}
        >
            {
                props.header.map((item, index) => {
                    return (<Cell displayValue={props.dataItem[item.selector!]} key={index + item.selector!} classNames={props.classNames.cellElementCss} dense={props.dense} />)
                })
            }
        </tr>

    )
}

export default Row;