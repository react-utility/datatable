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
import '../assets/css/Comprehensive.css';
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
    headerElement: {
        header: 'header-cell',
    },
    cellElement: {
        cell: 'tabel-cell'
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

const Template = ({ options, classNames }) => {
    const [columns] = useState(() => Header.map(item => ({ ...item, sortable: true })));
    const [data] = useState([...Data]);
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