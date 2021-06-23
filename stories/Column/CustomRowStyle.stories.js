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
    title: 'Column/Custom Row Styling',
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
    highlightOnHover: true,
    pagination: true,
    showRowPerPageDropdown: true,
    showRowsPerPage: true,
    customRowStyles: [
        {
            when: (row) => row.minTemp <= '15' + String.fromCharCode(176) + 'C',
            style: (row) => {
                return ({
                    color: '#84CC16',
                    backgroundColor: '#ECFDF5',
                })
            }
        }
    ]
}

const Template = ({ options, classNames }) => {
    const [columns] = useState([...Header]);
    const [data] = useState([...Data]);

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

export const CustomRowStyling = Template.bind({});
CustomRowStyling.args = {
    options: options,
    classNames: customClassNames
}