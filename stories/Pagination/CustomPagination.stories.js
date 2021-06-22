import React, { useState, useEffect } from 'react';
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
  title: 'Pagination/Custom Pagination',
  component: DataTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Provide Custom Pagination to Datatable</Subtitle>
          <Description>Custom pagination should be react functional component and passed as an option to the Datatable. A React functional componet gives us liberty to create our own custom Icons as we require.</Description>
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

const Template = ({ options, classNames }) => {
  const [columns] = useState([...Header]);
  const [data] = useState([...Data]);
  return (
    <div>
      <div>
        <h2 className="header">Weather Report - <span>Custom Pagination (Not Implemented)</span></h2>
        <p className="header-desc">Change the options in below control tab to see effect</p>
        <pre>
          {JSON.stringify(options)}
        </pre>
      </div>
      <DataTable columns={columns} data={data} options={options} classNames={classNames} />
    </div>
  )
}

export const CustomPagination = Template.bind({});

CustomPagination.args = {
  options: options,
  classNames: {},
}