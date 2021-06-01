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

import '../stories.css';
import DataTable from '../../src/index';
import { Data, Header } from '../data/weather.js';

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


const customClassNames = {
  pagination: {
    paginationButton: 'paginationCustomButton'
  }
}

const options = {
  pagination: true,
  showRowPerPageDropdown: true,
  showRowsPerPage: true,

}

const Template = ({ header, data, options, classNames }) => {
  return (
    <div>
      <div>
        <h2 className="header">Weather Report - <span>Custom Pagination (Not Implemented)</span></h2>
        <p className="header-desc">Change the options in below control tab to see effect</p>
        <pre>
          {JSON.stringify(options)}
        </pre>
      </div>
      <DataTable header={header} data={data} options={options} classNames={classNames} />
    </div>
  )
}

export const CustomPagination = Template.bind({});

CustomPagination.args = {
  header: [...Header],
  data: [...Data],
  options: options,
  classNames: customClassNames,
}