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


const CustomDescription = (DescriptionProps) => {

  return (
    <div className="custom-description">
      Now you can provide custom row per page options to the datatable, according to your data size. This will help better user interactions
      <br />
      You can see current default index is set to <code>1</code> which by default selects <code>20</code> from dropdown list.
      <br />
    </div>
  )
}

export default {
  title: 'Pagination/Custom Row Per Page',
  component: DataTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Provide Custom Row Per Page to Datatable</Subtitle>
          <CustomDescription />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
}

const getDataFromApi = async (api) => {
  let response = await fetch(api);
  return await response.json();
}


const options = {
  pagination: true,
  showRowPerPageDropdown: true,
  showRowsPerPage: true,
  rowsPerPage: { option: [10, 20, 60, , 80, 100, 200], defaultIndex: 1 }
}

const Template = ({ options, classNames }) => {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);

  useEffect(() => {
    async function getHeader() {
      let respheader = await getDataFromApi('https://sangramthecoder.github.io/api/weather-anomalies-header.json');
      setHeader(respheader.weathernaomaliesHeader);
    }
    async function getData() {
      let respdata = await getDataFromApi('https://sangramthecoder.github.io/api/weather-anomalies.json');
      setData(respdata.results);
    }
    getHeader();
    getData();
  }, []);

  return (
    <div>
      <div>
        <h2 className="header">Weather Anomalies - <span>Custom Row Per Page</span></h2>
        <p className="header-desc">Change the options in below control tab to see effect</p>
        <pre>
          {JSON.stringify(options)}
        </pre>
      </div>
      <DataTable header={[...header]} data={[...data]} options={options} classNames={classNames} />
    </div>
  )
}

export const CustomRowPerPage = Template.bind({});

CustomRowPerPage.args = {
  options: options,
}