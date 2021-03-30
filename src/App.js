import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Error from './components/Error';
import Form from './components/Form';
import Header from './components/Header';
import Weather from './components/Weather';


function App() {
  
  //states
  const [search, setSearch] = useState({
    city: '',
    country: ''
})
  const [sendConsult, setSendConsult] = useState(false) 
  const [result, setResult] = useState({})
  const [error, setError] = useState(false)

  //Desestructuring city and country
  const {city, country} = search;
  
  useEffect(()=>{
    const consulingtAPI = async () =>{

      if (sendConsult){

        const apiKey = 'a0b40f17844dc8155e6d1b307ac1ed9e'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`

        const response = await fetch(url)
        const result = await response.json()

        setResult(result)
        setSendConsult(false)

        // Detect if there were errors in the query
        if(result.cod === '404'){
          setError(true)
        } else {
          setError(false)
        }
      }
    }

    consulingtAPI()
  },[sendConsult])

  //Conditional loading component
  let component; 
  if(error){
    component = <Error message="No hay resultado" />
  } else {
    component = <Weather result={result}/>
  }

  return (
    <>
      <Header
        title='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                setSearch={setSearch}
                setSendConsult={setSendConsult}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
