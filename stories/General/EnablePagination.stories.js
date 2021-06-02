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
import { Data, Header } from '../data/weather.js';


const CustomDescription = (DescriptionProps) => {

    return (
        <div className="custom-description">
            This flag helps to enable pagination with the datatable. By default you will get Dropwdown menu to select rows per page, a text indicator for rows per page navigated and pagination navigation buttons.
            <br />
            Some other useful flags are as follows:
            <br />
            <code>showRowPerPageDropdown</code><span style={{ 'fontStyle': 'italic', 'fontSize': 'small', 'color': '#8b8b8b' }}> By Default it is set to true</span>
            <br />
            <code>showRowsPerPage</code><span style={{ 'fontStyle': 'italic', 'fontSize': 'small', 'color': '#8b8b8b' }}> By Default it is not set, means false.</span>
        </div>
    )
}
export default {
    title: 'General/Pagination',
    component: DataTable,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle>Use <code>pagination</code> option for enable pagination in the datatable.</Subtitle>
                    <CustomDescription />
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            ),
        },
    },
}

const options = {
    pagination: true,
    showRowPerPageDropdown: true,
    showRowsPerPage: true,
}

const Template = ({ header, data, options }) => {
    return (
        <div>
            <div>
                <h2 className="header">Weather Report - <span>Enable Pagination</span></h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
                <pre>
                    {JSON.stringify(options)}
                </pre>
            </div>
            <DataTable header={header} data={data} options={options} />
        </div>
    )
}

export const Pagination = Template.bind({});
Pagination.args = {
    header: [...Header],
    data: [...Data],
    options: options
}