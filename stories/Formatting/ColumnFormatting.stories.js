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

console.log(Header);
export default {
    title: 'Formatting/Custom Formating',
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

    const actions = [{
        name: 'Actions',
        selector: 'action',
        formatting: (row) => {
            return (
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        }
    }];

    const newHeader = [...TableHeader, ...actions];

    const [columns] = useState(newHeader);
    const [data] = useState(TableData);

    return (
        <div>
            <div>
                <h2 className="header">Weather Report - <span>Cell Formatting</span></h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
                <pre>
                    {JSON.stringify(options)}
                </pre>
            </div>
            <DataTable columns={columns} data={data} options={options} classNames={classNames} />
        </div>
    )
}

export const CustomFormating = Template.bind({});
CustomFormating.args = {
    options: options,
    classNames: customClassNames
}