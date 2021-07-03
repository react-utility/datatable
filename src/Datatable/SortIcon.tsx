import React, { useEffect, useRef, useState } from 'react';
import { Icon } from './icon';
import {SortProps, Sorting } from './types';

const SortIcon: React.FC<SortProps> = ({ isHeaderClicked, onSortClicked, prevDirection, item, classNames}) => {
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
        <div ref={iconRef} className={classNames.headerIcon}>
            <Icon id="sortDesc" name="sortDesc" className={sortClass.desc} onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                onSortClicked(Sorting.DESC, item, event);
            }} />
            <Icon id="sortAsc" name="sortAsc" className={sortClass.asc} onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                onSortClicked(Sorting.ASC, item, event);
            }} />
        </div>
    )
}

export default SortIcon;
