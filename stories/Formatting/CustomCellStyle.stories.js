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

const TableData = JSON.parse(JSON.stringify(Data));
const TableHeader = JSON.parse(JSON.stringify(Header));
export default {
    title: 'Formatting/Custom Cell Styling',
    component: DataTable,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle>Use <code>customCellStyles</code> option for custom cell Formatting.</Subtitle>
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
    const newHeader = TableHeader.map((item) => {
        if (item.selector === 'maxTemp') {
            item.customCellStyles = [
                {
                    when: (value) => true,
                    style: () => {
                        return ({
                            paddingLeft: '1rem',
                            backgroundColor: '#FEF08A',
                        });
                    }
                },
                {
                    when: (value) => {
                        var temp = parseInt(value.substring(0, value.length - 2));
                        if (temp <= 20) {
                            return true;
                        }
                        return false;
                    },
                    style: () => {
                        return ({
                            backgroundColor: '#4ADE80',
                            color: '#FAFAFA',
                            paddingLeft: '1rem',
                        });
                    }
                },
                {
                    when: (value) => {
                        var temp = parseInt(value.substring(0, value.length - 2));
                        if (temp > 30) {
                            return true;
                        }
                        return false;
                    },
                    style: () => {
                        return ({
                            backgroundColor: '#EF4444',
                            color: '#FAFAFA',
                            paddingLeft: '1rem',
                        });
                    }
                },

            ];
        }

        return item;
    });
    const [columns] = useState(newHeader);
    const [data] = useState(TableData);

    return (
        <div>
            <div>
                <h2 className="header">Weather Report - <span>Custom Cell Styling</span></h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
                <pre>
                    {JSON.stringify(options)}
                </pre>
            </div>
            <DataTable columns={columns} data={data} options={options} classNames={classNames} />
        </div>
    )
}

export const CustomCellStyling = Template.bind({});
CustomCellStyling.args = {
    options: options,
    classNames: customClassNames
}