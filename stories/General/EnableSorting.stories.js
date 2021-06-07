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
  title: 'General/Sorting',
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


const newData = [...Data];
const newHeader = Header.map(item => ({ ...item, sortable: true }));

const Template = ({ columns }) => {
  const [data] = useState([...Data]);
  return (
    <div>
      <div>
        <h2 className="header">Weather Report</h2>
        <p className="header-desc">Change the options in below control tab to see effect</p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export const Sorting = Template.bind({});
Sorting.args = {
  columns: newHeader,
}