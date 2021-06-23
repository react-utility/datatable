import React, {useState } from 'react';
import Button from './Elements/Button';
import SortIcon from './SortIcon';
import { HeaderProps, Sorting } from './types';



const Header: React.FC<HeaderProps> = (props) => {

    const [headerClicked, setHeaderClicked] = useState<boolean>(props.item.isSorted);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setHeaderClicked(!headerClicked);
        props.onHeaderClick!(!headerClicked, props.item, event);
    }

    const onSortClickedCustom = (asc : boolean, event : any) => {
        props.onSortIconClick!(asc ? Sorting.ASC : Sorting.DESC, props.item, event);
    }


    return (
        <th className={props.dense!.isDense ? props.classNames!.header + ' ' + props.dense!.denseCss : props.classNames!.header}>
            <div className={props.classNames!.headerInner}>
                <Button className={props.classNames!.headerButton} onClickHandler={handleOnClick} onMouseOutHandler={() => { setIsHovered(false) }} onMouseOverHandler={() => { setIsHovered(true) }}>
                    {props.item.name!}
                </Button>
                {
                    props.item.sortable && props.item.customSortIcon && <props.item.customSortIcon selector={props.item.selector} isHeaderClicked={headerClicked} onSortClicked={onSortClickedCustom} prevDirection={props.item.sortDirection!} isHeaderHovered={isHovered} onSearch={props.onSearch!}/>
                }
                {
                    props.item.sortable && !props.item.customSortIcon && <SortIcon props={props} isHeaderClicked={headerClicked} onSortClicked={props.onSortIconClick!} prevDirection={props.item.sortDirection!} />
                }

            </div>
        </th>
    )
}

export default Header;