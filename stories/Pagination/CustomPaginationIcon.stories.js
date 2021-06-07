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
  title: 'Pagination/Custom Pagination Icon',
  component: DataTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Provide Custom Pagination Icon to Datatable</Subtitle>
          <Description>All custom pagination Icon should be react functional component and passed as an option to the Datatable. A React functional componet gives us liberty to create our own custom Icons as we require.</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
}

const FirstIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="paginationCustomIcon" viewBox="0 0 16 16" stroke="currentColor">
      <path strokeWidth="0.5" fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      <path strokeWidth="0.5" fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </svg>
  )
}

const PreviousIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="paginationCustomIcon" viewBox="0 0 16 16">
      <path strokeWidth="0.5" fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </svg>
  )
}

const NextIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="paginationCustomIcon" viewBox="0 0 16 16" stroke="currentColor">
      <path strokeWidth="0.5" fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </svg>
  )
}

const LastIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="paginationCustomIcon" viewBox="0 0 16 16" stroke="currentColor">
      <path strokeWidth="0.5" fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
      <path strokeWidth="0.5" fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
    </svg>
  )
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
  paginationIconFirstPage: FirstIcon,
  paginationIconLastPage: LastIcon,
  paginationIconNext: NextIcon,
  paginationIconPrevious: PreviousIcon

}

const Template = ({ options, classNames }) => {
  const [columns] = useState([...Header]);
  const [data] = useState([...Data]);
  return (
    <div>
      <div>
        <h2 className="header">Weather Report - <span>Custom Pagination Icon</span></h2>
        <p className="header-desc">Change the options in below control tab to see effect</p>
        <pre>
          {JSON.stringify(options)}
        </pre>
      </div>
      <DataTable columns={columns} data={data} options={options} classNames={classNames} />
    </div>
  )
}

export const CustomPaginationIcon = Template.bind({});

CustomPaginationIcon.args = {
  options: options,
  classNames: customClassNames,
}