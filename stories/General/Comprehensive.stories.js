import React from 'react';
import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

import '../stories.css';
import DataTable from '../../src/index';
import { Data, Header } from '../assets/data/weather.js';

export default {
    title: 'General/Comprehensive',
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
    },
}

const options = {
    showCaption: true,
    pagination: true,
    showRowPerPageDropdown: true,
    showRowsPerPage: true,
}

const Template = ({ columns, data, options }) => {
    return (
        <div>
            <div>
                <h2 className="header">Weather Report - <span>Enable Pagination</span></h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
                <pre>
                    {JSON.stringify(options)}
                </pre>
            </div>
            <DataTable columns={columns} data={data} options={options} />
        </div>
    )
}

export const Comprehensive = Template.bind({});
Comprehensive.args = {
    columns: [...Header],
    data: [...Data],
    options: options
}