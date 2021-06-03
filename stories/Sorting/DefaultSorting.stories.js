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
  title: 'Sorting/Default Sorting',
  component: DataTable,
  argsType: {
    label: {
      name: 'label',
      type: { name: 'string', required: false },
      defaultValue: 'Hello',
      description: 'demo description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Hello' },
      }
    }
  },


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
const newHeader = [...Header];
const options = {
  defaultSortHeader: 'id',
  defaultSortAscending: true
}

const Template = ({ header, data, options }) => {
  return (
    <div>
      <div>
        <h2 className="header">Weather Report</h2>
        <p className="header-desc">Change the options in below control tab to see effect</p>
        <pre>
          {JSON.stringify(options)}
        </pre>
      </div>
      <DataTable header={header} data={data} options={options} />
    </div>
  )
}

export const DefaultSorting = Template.bind({});
DefaultSorting.args = {
  header: newHeader,
  data: newData,
  options: options,
}
