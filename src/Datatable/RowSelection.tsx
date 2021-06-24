import React from 'react';
import { RowSelectionProps } from './types';

const RowSelection : React.FC<RowSelectionProps> = (props) => {
    return (
        <>
        {
            props.customRowSelection && <props.customRowSelection row={props.row} invokeRowSelection={props.onRowSelection}/> 
        }
        {
            !props.customRowSelection && 
            <input type='checkbox' onChange={(event) => {
                props.onRowSelection(props.row,event);
            }} className={props.classNames!}/>
        }
        
        </>
    )
}

export default RowSelection;