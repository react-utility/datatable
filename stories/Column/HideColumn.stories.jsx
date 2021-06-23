import React, { useState, useRef } from 'react';
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
    title: 'Column/Hide Column',
    component: DataTable,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle>Use <code>formatting</code> option for custom cell Formatting.</Subtitle>
                    <Description />
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            ),
        },
    },
}

const customClassNames = {
    highlightOnHoverClass: 'rows-hover'
}

const options = {
    responsive: true,
    highlightOnHover: true,
    pagination: true,
    showRowPerPageDropdown: true,
    showRowsPerPage: true
}

const Template = ({ options, classNames }) => {
    const TableData = JSON.parse(JSON.stringify(Data));
    const TableHeader = JSON.parse(JSON.stringify(Header));

    const [columns,setColumns] = useState(TableHeader.map((item) => ({...item,showColumn: true})));
    const [data] = useState(TableData);
    const [toggleState,setToggleState] = useState(false);

    const ulRef = useRef(null);

    const handleToogleColumnVisibility = (columnId,event) => {
        setColumns((prevColumn) => {
            return prevColumn.map(item => {
                if(item.selector === columnId){
                    item.showColumn = event.target.checked
                }
                return item;
            })
        });
    }
    
    const handleToggleClick = () => {
        if(!toggleState){
            ulRef.current.style.display = 'block';
        }else{
            ulRef.current.style.display = 'none';
        }
        setToggleState(!toggleState);
    }
    return (
        <div>
            <div>
                <h2 className="header">Weather Report - <span>Column Hiding</span></h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
                <pre>
                    {JSON.stringify(options)}
                </pre>

                <div style={{position: 'relative' ,width: '100%',padding: '0.5rem 0 0.5rem 0',marginBottom: '1rem',display: 'flex', justifyContent: 'flex-end'}}>
                    <button onClick={handleToggleClick}>Toggle Column</button>
                    <ul ref={ulRef} style={{display:'none', position: 'absolute', backgroundColor: 'gray', listStyleType: 'none',padding:'0',top:'1rem', width:'10rem', fontSize: '0.8rem', borderRadius: '0.25rem'}}>
                        {
                            columns.map((item,index) => {
                                return (
                                    <li style={{padding: '0.25rem 0 0.25rem 0.5rem'}} key={index + '_' + item.selector}>
                                        <div style={{display:'flex',alignItems:'center'}}>
                                            <input type='checkbox' onChange={handleToogleColumnVisibility.bind(this,item.selector)} defaultChecked={item.showColumn}/>
                                            <label style={{paddingLeft: '0.5rem'}}>{item.name}</label>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                
            </div>


            <DataTable columns={columns} data={data} options={options} classNames={classNames} />
        </div>
    )
}

export const HideColumn = Template.bind({});
HideColumn.args = {
    options: options,
    classNames: customClassNames
}