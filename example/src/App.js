import DataTable from 'react-datatable';
import { useEffect, useState } from "react";

function App() {
  const [count,setCount] = useState(0);
  useEffect(() => {
    setCount(prevCount => prevCount + 1);
  },[]);

  return (
    <div className="App">
      <DataTable text={'Hola la le lo '} number={count}/>
      <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >Learn React
        </a>
    </div>
  );
}

export default App;
