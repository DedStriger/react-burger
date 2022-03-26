import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
function App() {

  const [data, setData] = useState([])

  const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    const getData = async (api: string) => await fetch(api)
    .then(
      (resp) => resp.json()
      .then((data) => setData(data.data))
      .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));

    getData(apiUrl)
  }, [])

  return (
    <div className="App">
     <AppHeader/>
     <Main data={data}/>
    </div>
  );
}


export default App;
