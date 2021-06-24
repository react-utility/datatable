import React from 'react';
import { RowSelectionProps } from './types';

const RowSelection : React.FC<RowSelectionProps> = (props) => {
    return (
        <>
        {
            props.customRowSelection && !props.isRowSelectionHidden(props.row) && <props.customRowSelection row={props.row} invokeRowSelection={props.onRowSelection}/> 
        }
        {
            !props.customRowSelection && !props.isRowSelectionHidden(props.row) &&
            <input type='checkbox' onChange={(event) => {
                props.onRowSelection(props.row,event);
            }} className={props.classNames!} disabled={props.isRowSelectionDisabled(props.row)}/>
        }
        
        </>
    )
}

export default RowSelection;