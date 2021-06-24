import React from 'react';
import { RowSelectionProps } from './types';

const RowSelection : React.FC<RowSelectionProps> = (props) => {
    return (
        <input type='checkbox' onChange={(event) => {
            props.onRowSelection(props.row,event);
        }} className={props.classNames!}/>
    )
}

export default RowSelection;