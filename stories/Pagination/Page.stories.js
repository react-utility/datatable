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

import DataTable from '../../src/index'

const column = [
    {name: 'Record Id',selector: 'id'},
    {name: 'Location',selector: 'location'},
    {name: 'Latitude',selector: 'lat'},
    {name: 'Longitude',selector: 'long'},
    {name: 'Max Temp',selector: 'maxTemp'},
    {name: 'Min Temp',selector: 'minTemp'},
    {name: 'Humidity',selector: 'humidity'},
    {name: 'Date Recorded',selector: 'recordDate'}
]

const data = [
    {id:1,location:'United Kingdom',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'88%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:10,location:'India',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'98%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:122,location:'United States of America',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'78%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:21,location:'Canada',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'58%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:51,location:'Singapore',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'88%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:11,location:'Malaysia',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'98%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:2,location:'United Arab Emirates',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'58%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:3,location:'Israel',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'81%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:4,location:'Egypt',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'82%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:5,location:'Spain',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'83%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:6,location:'Italy',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'84%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:7,location:'Germany',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'71%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:8,location:'Portugal',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'78%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:9,location:'Norway',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'68%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:19,location:'Australia',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'98%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:17,location:'Paraguay',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'88%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:16,location:'Brazil',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'88%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:15,location:'Argentina',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'98%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:14,location:'South Africa',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'88%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:13,location:'Nigeria',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'92%',recordDate:'2020-10-11 00:10:00 GMt'},
    {id:12,location:'Peru',lat:'',long:'',maxTemp:'10 &deg C',minTemp:'20 &deg C',humidity:'92%',recordDate:'2020-10-11 00:10:00 GMt'},
]

export default {
    title: 'Pagination/Default',
    component: React.createElement(DataTable),
    argTypes : {
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
      }
}

export const Default = () => {
    return (
        <div>
            <h2>Pagination</h2>
            <DataTable header={column} options={{}}/>
            
        </div>
    )
}