import React,{useState} from 'react';
import { RowExpansionProps } from './types';

const ShowIconComponent : React.FC<{id: string,showIcon : React.FC<any>, className : string}> = (props) => {
    if(props.showIcon){
        return (
            <div className={props.className} id={props.id!}>
                <props.showIcon />
            </div>
        )
    }else{
        return(
            <div className={props.className} id={props.id!}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" id={props.id!}>
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            
        )
    }
}

const HideIconComponent : React.FC<{id: string, hideIcon : React.FC<any>, className : string}> = (props) => {
    if(props.hideIcon!){
        return(
            <div className={props.className} id={props.id!}>
                <props.hideIcon />
            </div>
            
        )
    }else{
        return(
            <div className={props.className} id={props.id!}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={props.className} id={props.id!}>
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            
        )
    }
}

const RowExpansion : React.FC<RowExpansionProps> = (props) => {
    const [showExpanded, setShowExpanded] = useState(false);

    const handleRowExpansion = () => {
        props.rowIsExpanded(!showExpanded);
        setShowExpanded(!showExpanded);
    }

    return (
        <div onClick={handleRowExpansion.bind(this)}> 
            {
                !showExpanded && <ShowIconComponent id={props.id!} showIcon={props.customRowExpansionIcon.show}
                    className={props.isRowExpansionDisabled ? props.classNames! + ' ' + "row-expansion-show-icon-disabled" : props.classNames! + ' ' + "row-expansion-show-icon"} />
                
            }
            {
                showExpanded && <HideIconComponent id={props.id!} hideIcon={props.customRowExpansionIcon.hide} 
                className={props.isRowExpansionDisabled ? props.classNames! + ' ' + "row-expansion-show-icon-disabled" : props.classNames! + ' ' +  "row-expansion-show-icon"} />
            }
        </div>
    )
}



export default RowExpansion;