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
      resp.ok &&
      resp.json()
      .then((data) => setData(data.data))
      }
    )
    .catch((err) => console.log(err));

    getData()
  }, [])
  return (
    <GlobalData.Provider value={data}>
    <div className="App">
     <AppHeader/>
     <Main/>
    </div>
    </GlobalData.Provider>
  );
}


export default App;
