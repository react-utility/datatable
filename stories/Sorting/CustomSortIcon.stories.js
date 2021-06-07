import React, { useEffect, useState, useRef } from 'react';
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
import DataTable from '../../src/index';
import { Data, Header } from '../assets/data/weather.js';


export default {
    title: 'Sorting/Custom Sort Icon',
    component: DataTable,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle>Use <code>defaultSortHeader</code> and <code>defaultSortAscending</code> options for Sort Data by default during initial load.</Subtitle>
                    <Description>Default sorting doesn't require `stortable` parameter to be added into header. Just pass the key and sort direction to sort the data during initial load. If no custom sort function is provided then it uses in-built sorting algorithim.</Description>
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            ),
        },
    },
}

const options = {
    defaultSortHeader: 'id',
    defaultSortAscending: true
}



const CustomIcon = (props) => {
    let direction;
    if (props.prevDirection !== undefined) {
        direction = props.prevDirection === 0 ? true : false;
    } else {
        direction = false;
    }
    const [asc, setAsc] = useState(direction);



    return (
        <div className="header-icon">
            {
                !props.isHeaderClicked && props.isHovered && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
                    <path fillRule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                    <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                </svg>
            }
            {
                props.isHeaderClicked && asc && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={(e) => {
                    setAsc(!asc);
                    props.onSortClicked(1, props.props.item, e);
                }}>
                    <path fillRule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                    <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                </svg>
            }
            {
                props.isHeaderClicked && !asc && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={(e) => {
                    setAsc(!asc);
                    props.onSortClicked(0, props.props.item, e);
                }}>
                    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
                    <path fillRule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                    <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                </svg>
            }
        </div>
    )
}

const newHeader = Header.map(item => {
    if (item.selector === 'id') {
        return ({ ...item, sortable: true, sortIcon: CustomIcon });
    }
    return ({ ...item, sortable: true })
});

const Template = ({ columns }) => {
    const [data] = useState([...Data]);
    return (
        <div>
            <div>
                <h2 className="header">Weather Report</h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
                <div className="header-config">
                    <pre>
                        Header Settings: {JSON.stringify({ "name": "Record Id", "selector": "id", "sortable": true, "sortIcon": "<your custom icon component>" })}
                    </pre>
                    <pre>
                        Custom Component Props: {JSON.stringify({ "isHeaderClicked": "boolean", "onSortClicked": "function(sortDirection:Sorting,headerItem:TableColumn,event:React.MouseEvent)  => void", "prevDirection": "Sorting", "isHovered?": "boolean", "props": "HeaderProps" })}
                    </pre>
                </div>

            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export const CustomSortIcon = Template.bind({});
CustomSortIcon.args = {
    columns: newHeader,
}