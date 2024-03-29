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
import { coffequality, coffequalityHeader } from '../assets/data/coffequality.js';

export default {
  title: 'Progress/Custom Progress Bar',
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

const customLoader = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ overflow: 'hidden', height: '0.25rem', marginBottom: '1rem', fontSize: '0.75rem', lineHeight: '1rem', display: 'flex', backgroundColor: 'rgba(251, 207, 232,1)' }}>
      </div>
    </div>
  )
}

const options = {
  showProgressPending: true,
  pagination: true,
  responsive: true,
  showRowPerPageDropdown: true,
  showRowsPerPage: true,
  customProgressPendingComponent: customLoader
}

const Template = ({ options }) => {
  const [columns] = useState([...coffequalityHeader]);
  const [newData, setNewData] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPending(false);
      setNewData([...coffequality]);
    }, 1000);
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

export const CustomProgressBar = Template.bind({});
CustomProgressBar.args = {
  options: options
}
