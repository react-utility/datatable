import React, { useEffect, useRef, useState } from 'react';
import Button from './Elements/Button';
import { Icon } from './icon';
import { HeaderItem, HeaderProps, Sorting } from './types';



const Header: React.FC<HeaderProps> = (props) => {

    const [headerClicked, setHeaderClicked] = useState<boolean>(props.item.isSorted);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setHeaderClicked(!headerClicked);
        props.onHeaderClick!(!headerClicked, props.item, event);
    }
    return (
        <th>
            <div className={props.classNames!.headerInner}>
                <Button className={props.classNames!.headerButton} onClickHandler={handleOnClick} onMouseOutHandler={() => { setIsHovered(false) }} onMouseOverHandler={() => { setIsHovered(true) }}>
                    {props.item.name!}
                </Button>
                {
                    props.item.sortable && props.item.sortIcon && <props.item.sortIcon props={props} isHeaderClicked={headerClicked} onSortClicked={props.onSortIconClick!} prevDirection={props.item.sortDirection!} isHovered={isHovered} />
                }
                {
                    props.item.sortable && !props.item.sortIcon && <SortIcon props={props} isHeaderClicked={headerClicked} onSortClicked={props.onSortIconClick!} prevDirection={props.item.sortDirection!} />
                }

            </div>
        </th>
    )
}

const SortIcon: React.FC<HeaderItem> = ({ isHeaderClicked, onSortClicked, prevDirection, props }) => {
    const iconRef = useRef<HTMLDivElement>(null);
    const [sortClass, setSortClass] = useState({ asc: '', desc: '' });

    useEffect(() => {
        if (isHeaderClicked) {
            iconRef.current?.classList.add("show");
            if (prevDirection) {
                if (prevDirection === Sorting.DESC) {
                    setSortClass({ asc: '', desc: 'icon-focus' });
                } else {
                    setSortClass({ asc: 'icon-focus', desc: '' });
                }
            } else {
                setSortClass({ asc: 'icon-focus', desc: '' });
            }
        } else {
            iconRef.current?.classList.remove("show");
            setSortClass({ asc: '', desc: '' });
        }
    }, []);
    return (
        <div ref={iconRef} className={props.classNames!.headerIcon}>
            <Icon id="sortDesc" name="sortDesc" className={sortClass.desc} onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                onSortClicked(Sorting.DESC, props.item, event);
            }} />
            <Icon id="sortAsc" name="sortAsc" className={sortClass.asc} onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                onSortClicked(Sorting.ASC, props.item, event);

            }} />
        </div>
    )
}

/**
 * {
                    props.item.sortable && !props.item.isSorted && <Icon name="sortAsc" className={props.classNames!.headerButton + ' ' + props.classNames!.headerIcon} />
                }
                {
                    props.item.sortable && props.item.isSorted && <Icon name="sortDesc" className={props.classNames!.headerButton + ' ' + props.classNames!.headerIcon} />
                }
 */
export default Header;