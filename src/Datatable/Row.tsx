import React from 'react';
import Cell from './Cell';
import { RowProps } from './types';


const Row :React.FC<RowProps> = (props: RowProps) => {
    return (
        <tr key={props.index}>
            {
                props.header.map((item, index) => {
                    return (<Cell displayValue={props.dataItem[item.selector!]} key={index + item.selector!} />)
                })
            }
        </tr>

    )
}

export default Row; 