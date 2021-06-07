import React from 'react';
import Cell from './Cell';
import { RowProps } from './types';


const Row: React.FC<RowProps> = (props: RowProps) => {
    return (
        <tr key={props.index} className={props.classNames.rowElementCss}>
            {
                props.header.map((item, index) => {
                    return (<Cell displayValue={props.dataItem[item.selector!]} key={index + item.selector!} classNames={props.classNames.cellElementCss} dense={props.dense} />)
                })
            }
        </tr>

    )
}

export default Row;