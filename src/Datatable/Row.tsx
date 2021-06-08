import React, { useRef, useEffect } from 'react';
import Cell from './Cell';
import { RowProps } from './types';


const Row: React.FC<RowProps> = (props: RowProps) => {
    const row = useRef<HTMLTableRowElement>(null);
    const clickCount = useRef<number>(0);
    const delay: number = 300;

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

    return (
        <tr key={props.index}
            className={props.classNames.rowElementCss}
            ref={row}
            onClick={handleOnClick.bind(this, props.dataItem)}
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