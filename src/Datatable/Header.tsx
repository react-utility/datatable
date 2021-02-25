import React, { useEffect, useRef, useState } from 'react';
import { HeaderProps, Sorting } from './interfaces';



const Header: React.FC<HeaderProps> = (props) => {

    const column = useRef<HTMLButtonElement>(null);
    const [asc, setAsc] = useState<boolean>(true);
    const [openSortIcon,setOpenSortIcon] = useState<boolean>(false);
    
    useEffect(() => {
        if(props.sortState!.sortKey === props.item.selector){
            setOpenSortIcon(props.sortState!.isSorted);
        }
    },[props.sortState]);

    return (
        <>
            <th
                className={props.classNames?.header ?  props.classNames?.header : 'header'}
            >
                <div className={props.classNames?.headerInner ? props.classNames.headerInner : 'headerInner'}>
                    <button
                        ref={column}
                        value={props.item.name}
                        className={props.classNames?.headerName ? props.classNames.headerName : "appearance-none"}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            if (props.item.sortable) {
                                props.onColumnClick(openSortIcon, props.item,e);
                                setAsc(true);
                            }
                        }}
                    >
                        {props.item.name}
                    </button>
                    {
                        props.sortState!.sortKey === props.item.selector && openSortIcon && asc &&
                        <button
                            id="sortAsc"
                            className="appearance-none"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                props.onSortClick(Sorting.DESC, props.item,e);
                                setAsc(!asc);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                            </svg>
                        </button>

                    }

                    {
                        props.sortState!.sortKey === props.item.selector && openSortIcon && !asc &&
                        <button
                            id="sortDesc"
                            className="appearance-none"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                props.onSortClick(Sorting.ASC, props.item,e);
                                setAsc(!asc);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="" viewBox="0 0 16 16">
                                <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                                <path fillRule="evenodd" d="M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
                                <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                            </svg>
                        </button>

                    }

                </div>
            </th>

        </>
    )
}

export default Header;