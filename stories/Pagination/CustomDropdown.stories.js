import React, { useRef } from 'react';
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
  title: 'Pagination/Custom Dropdown',
  component: DataTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Provide Custom Dropdown to Datatable</Subtitle>
          <Description>Provide your own custom dropdown to the Datatable. A React functional componet gives us liberty to create our own custom Icons as we require.</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
}

const MyOwnDropdown = ({ className, updateRows, rowsPerPage }) => {

  const customSelect = useRef();

  const handleOnRowPerPageChange = (event) => {
    customSelect.current.querySelector('.custom-select__trigger span').textContent = event.target.dataset.value;
    let rowPerPage = parseInt(event.target.dataset.value);
    updateRows(rowsPerPage.option.findIndex(item => item === rowPerPage));
  }

  const handleOnClickOpenDropdown = (e) => {
    customSelect.current.classList.toggle('open');
  }

  return (
    <div className={className}>
      <p>Select Rows</p>
      <div className="custom-select-wrapper" onClick={handleOnClickOpenDropdown}>
        <div className="custom-select" ref={customSelect}>
          <div className="custom-select__trigger">
            <span>{rowsPerPage.option[rowsPerPage.defaultIndex]}</span>
            <div className="arrow"></div>
          </div>
          <div className="custom-options">
            {
              rowsPerPage.option.map((item, index) => {
                if (index === rowsPerPage.defaultIndex) {
                  return <span key={'rowsPerPage_' + index} className="custom-option selected" data-value={item} onClick={handleOnRowPerPageChange}>{item}</span>
                }
                return <span key={'rowsPerPage_' + index} className="custom-option" onClick={handleOnRowPerPageChange} data-value={item}>{item}</span>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const customClassNames = {
  pagination: {
    paginationDropdown: 'custom-pagination-dropdown',
  }
}

const options = {
  pagination: true,
  showRowPerPageDropdown: true,
  showRowsPerPage: true,
  customRowPerPageDropdown: MyOwnDropdown
}

const Template = ({ header, data, options, classNames }) => {
  return (
    <div>
      <div>
        <h2 className="header">Weather Report - <span>Custom Dropdown</span></h2>
        <p className="header-desc">Change the options in below control tab to see effect</p>
        <pre>
          {JSON.stringify(options)}
        </pre>
      </div>
      <DataTable header={header} data={data} options={options} classNames={classNames} />
    </div>
  )
}

export const CustomDropdown = Template.bind({});

CustomDropdown.args = {
  header: [...Header],
  data: [...Data],
  options: options,
  classNames: customClassNames,
}