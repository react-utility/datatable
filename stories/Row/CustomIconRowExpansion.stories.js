import React, { useState } from 'react';
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
    title: 'Row/Custom Icon Row Expansion',
    component: DataTable,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle>Use <code>customRowStyles</code> option for custom Row Formatting.</Subtitle>
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
    pagination: true,
    enableRowExpansion: true,
    onRowClicked : (row, event) => {
        console.log(row,event);
    },
    onRowExpansionClicked : (row) => {
        console.log('onRowExpansionClicked is clicked');
    },
    onRowHideClicked : (row) => {
        console.log('onRowHideClicked is clicked');
    },
    customRowExpansionIcon:{
        show: () => {
            return(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
                </svg>
            )
        },
        hide: () => {
            return(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M3.646 13.854a.5.5 0 0 0 .708 0L8 10.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zm0-11.708a.5.5 0 0 1 .708 0L8 5.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708z"/>
                </svg>
            )
        }
    },
    onRowExpanded: (row) => {
        return (
            <pre>
                {JSON.stringify(row,null,4)}
            </pre>
        )
    }
}

const Template = ({ options, classNames }) => {
    const [columns] = useState(JSON.parse(JSON.stringify(Header)));
    const [data] = useState(JSON.parse(JSON.stringify(Data)));

    return (
        <div>
            <div>
                <h2 className="header">Weather Report -<span>Custom Row Styles</span></h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
                <pre>
                    {JSON.stringify(options)}
                </pre>
            </div>
            <DataTable columns={columns} data={data} options={options} classNames={classNames} />
        </div>
    )
}

export const CustomIconRowExpansion = Template.bind({});
CustomIconRowExpansion.args = {
    options: options,
    classNames: customClassNames
}