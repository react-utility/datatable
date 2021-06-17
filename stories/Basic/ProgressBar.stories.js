import React, { useEffect, useState } from 'react';
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
    title: 'Basic/Progress Bar',
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
    showProgressPending: true
}

const Template = ({ options }) => {
    const [columns] = useState([...Header]);
    const [newData, setNewData] = useState([]);
    const [pending, setPending] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setPending(false);
            setNewData([...Data]);
        }, 10000);
        return () => {
            clearTimeout(timer);
        }
    }, []);
    return (
        <div>
            <div>
                <h2 className="header">Weather Report</h2>
                <p className="header-desc">Change the options in below control tab to see effect</p>
            </div>
            <DataTable columns={columns} data={newData} options={{ ...options, showProgressPending: pending }} />
        </div>
    )
}

export const ProgressBar = Template.bind({});
ProgressBar.args = {
    options: options
}
