import React, { useEffect, useState } from 'react';
import { GlobalData } from '../../service/GlobalData';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
function App() {

  const [data, setData] = useState([])

  const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    const getData = async () => await fetch(apiUrl)
    .then(
      (resp) => { 
        if (resp.ok) {
          return resp.json();
      }
      return Promise.reject(resp.status);
      }
    )
    .then(data => setData(data.data))
    .catch((err) => console.log(err));

    

    getData()

  }, [])

  return (
    <div className="App">
     <AppHeader/>
     <GlobalData.Provider value={data}>
      <Main/>
     </GlobalData.Provider>
    </div>
  );
}


export default App;
