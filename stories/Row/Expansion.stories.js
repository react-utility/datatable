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
    title: 'Row/Expansion',
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
    isRowExpansionDisabled : (row) => {
        return [10,112,51,8,9,4].includes(row.id)
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

export const Expansion = Template.bind({});
Expansion.args = {
    options: options,
    classNames: customClassNames
}