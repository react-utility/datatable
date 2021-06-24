import React , {useEffect} from 'react';
import { RowSelectionProps } from './types';

const RowSelection : React.FC<RowSelectionProps> = (props) => {
    const shouldBeHidden = props.isRowSelectionHidden ? props.isRowSelectionHidden(props.row) : false;
    const shouldBeDisabled = props.isRowSelectionDisabled ? props.isRowSelectionDisabled(props.row) : false;

    useEffect(() => {
        if(!shouldBeHidden && !shouldBeDisabled){
            props.onRowSelection(props.row,props.selectAll);
        }
    },[props.selectAll]);
    
    return (
        <>
        {
            props.customRowSelection && !shouldBeHidden && <props.customRowSelection row={props.row} invokeRowSelection={props.onRowSelection}/> 
        }
        {
            !props.customRowSelection && !shouldBeHidden &&
            <input 
            type='checkbox' 
            onChange={(event) => {
                props.onRowSelection(props.row,event.target.checked,event);
            }} 
            className={props.classNames!} 
            defaultChecked={props.selectAll}
            disabled={shouldBeDisabled}
            />
        }
        
        </>
    )
}

export default RowSelection;