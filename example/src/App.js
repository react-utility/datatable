import DataTable from 'react-datatable';
import { useEffect, useState } from "react";


function App() {
  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);

  //console.log('Rendering App since state is changed', header,data);
  useEffect(() => {
    async function fetchHeader() {
      let response = await fetch('header.json');
      let headerFetched = await response.json();
      setHeader(headerFetched.map((item) => ({ ...item,sortable: true })));
    }
    fetchHeader();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('data.json');
      let dataFetched = await response.json();
      setData(dataFetched);
    }
    fetchData();
  }, []);

  const options = {
    customProgressPendingComponent : customLoader,
    defaultSortHeader: 'ObservationId',
    defaultSortAsc: true,
  }

  const classes = {
    header : {
      header : 'bg-gray-300 border border-gray-900 text-left px-2 bg-gr',
      headerInner: undefined,
      headerName: undefined,
      sortIcon: undefined
    }
  }
  return (
    <div className="App">
      <div className="w-full flex items-center justify-center mt-8 border">
        <div className="w-8 h-8 text-gray-400">
          <img src="./logo192.png" alt="Datatable" className="w-full h-full"/>
        </div>
        <div>React Datatable Example</div>
      </div>
      
      <DataTable header={header} data={data} options={options} classNames={classes}/>
    </div>
  );
}

const customLoader = () => {

  return(
    <div className="relative">
      <div className="overflow-hidden h-1 mb-4 text-xs flex bg-pink-200">
      </div>
    </div>
  )
}

export default App;
