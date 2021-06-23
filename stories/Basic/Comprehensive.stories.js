import React, { useEffect, useState } from 'react';
import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

import '../assets/css/stories.css';
import '../assets/css/Comprehensive.css';
import DataTable from '../../src/index';
import { Data, Header } from '../assets/data/weather.js';
import { isTemplateLiteral } from 'typescript';


export default {
    title: 'Basic/Comprehensive',
    component: DataTable,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle>Use <code>pagination</code> option for enable pagination in the datatable.</Subtitle>
                    <Description></Description>
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            ),
        },
        backgrounds: {
            default: '',
            values: [
                { name: 'light', value: '#F9FAFB' },
                { name: 'dark', value: '#334155' },
            ],
        },
    },
}

const customClassNames = {
    tableWrapper: 'table-wrapper',
    tableHead: 'table-header',
    tableStriped: 'table-strip',
    highlightOnHoverClass: 'rows-onhover',
    tableBodyRowElement: 'row-element',
    headerElement: {
        header: 'header-cell',
    },
    cellElement: {
        cellElelmentCss: 'tabel-cell'
    },
}

const options = {
    showCaption: true,
    caption: 'Weather Report',
    noDataMessage: 'I have nothing to show',
    dense: false,
    responsive: true,
    showTableStriped: true,
    highlightOnHover: true,
    hideTableHeader: false,
    pagination: true,
    showRowPerPageDropdown: true,
    showRowsPerPage: true,
}

const CustomIcon = ({selector,isHeaderClicked, onSortClicked, prevDirection, isHeaderHovered, onSearch}) => {
    let direction;
    if (prevDirection !== undefined) {
        direction = prevDirection === 0 ? true : false;
    } else {
        direction = false;
    }
    const [asc, setAsc] = useState(direction);
    const [showFilter,setShowFilter] = useState(false);

    useEffect(() => {
        if(sessionStorage.getItem("showFilter") !== null){
            let mem = JSON.parse(sessionStorage.getItem("showFilter"));
            if(selector === mem.selector && mem.isOpened){
                setShowFilter(true);
            }
        }
    },[])

    return (
        <div className="custom-sort-icom">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={() =>  {
                    if(!showFilter){
                        sessionStorage.setItem("showFilter", JSON.stringify({isOpened: !showFilter, selector:selector}))
                    }else{
                        sessionStorage.removeItem("showFilter"); 
                        sessionStorage.removeItem("__search");
                    }
                    setShowFilter(!showFilter)
                }}>
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            {
                showFilter && 
                <div className="custom-sort-filter">
                    <div className="custom-sort-filter-item" onClick={(e) => {
                        onSortClicked(!asc, e);
                        setAsc(!asc);
                    }}>
                        <span className="icon-arrows">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
                            </svg>
                        </span>
                        <span>
                            Ascending
                        </span>
                    </div>
                    <div className="custom-sort-filter-item" onClick={(e) => {
                        onSortClicked(!asc, e);
                        setAsc(!asc);
                    }}>
                        <span className="icon-arrows">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </span>
                        <span>
                            Descending
                        </span>
                    </div>
                    <div className="custom-sort-filter-item">
                        <input type='text' placeholder="Search" onChange={(event) => {
                            console.log(event.target.value);
                            sessionStorage.setItem('__search', event.target.value);
                            onSearch(event.target.value,selector);
                        }} 
                        value={sessionStorage.getItem('__search') === null ? '' : sessionStorage.getItem('__search')}
                        autoFocus
                        />
                    </div>
                </div>
            }
        </div>
    )
}


const Template = ({ options, classNames }) => {
    
    const [columns] = useState(() => Header.map(item => ({ ...item, sortable: true, customSortIcon: CustomIcon })));
    const [data,setData] = useState([...Data]);

    return (
        <div>
            <div>
                <h2 className="header">Comprehensive<span>-All in one React Datatable</span></h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
                <pre className="text-sm">
                    {JSON.stringify(options)}
                </pre>
            </div>
            <DataTable columns={columns} data={data} options={options} classNames={classNames} />
        </div>
    )
}

export const Comprehensive = Template.bind({});
Comprehensive.args = {
    options: options,
    classNames: customClassNames
}