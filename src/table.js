import React, { useState, useEffect } from "react";
import "./App.css";

const getAllCountries = () => {
  return new Promise((resolve, reject) => {
    fetch("https://restcountries.com/v3.1/all").then((resp) => {
      resp.json().then((json) => {
        const countries: any[] = [];
        json.forEach((country) => {
          countries.push({
            name: country.name.common,
          });
        });
        resolve(countries);
      });
    });
  });
};

/*
  Returns a promise which will yield a list of universities given a country name, object looks like this:
  {
    alpha_two_code: "US",
    country: "United States",
    domains: [ "marywood.edu" ],
    name: "Marywood Unversity",
    state-province: "State",
    web_pages: [ "http://www.marywood.edu" ]
  }
*/
const getAllUniversities = (countryName) => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.allorigins.win/get?url=" +
        encodeURIComponent(
          `http://universities.hipolabs.com/search?country=${countryName}`
        )
    ).then((resp) => {
      resp.json().then((content) => {
        const json = JSON.parse(content.contents);
        resolve(json as any);
      });
    });
  });
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('')
  const [univs, setUnivs] = useState(null);
  useEffect(() => {
    getAllCountries().then((resp) => {
      setCountries(resp as any);
    });
  }, []);
  
  const fetchUnivs = async () => {
    let univs = []
    if (!country) {
       univs = []
    } else {
        univs = await getAllUniversities(country)
    }

    console.log(univs)
    setUnivs(univs)
  }

  useEffect(() => {
    fetchUnivs()
  }, [country]);

  const handleChange=(event) => {
    console.log(event.target.value)
     setCountry(event.target.value)
  }
  /*
  alpha_two_code: "SL"
  country: "Sierra Leone"
  domains: (1) ["fbcusl.8k.com"]
  state-province: null
  name: "Fourah Bay College, University of Sierra Leone" ()
  web_pages: (1) ["http://fbcusl.8k.com/"]
  */
  //name, state, domains, web pages
  // validateDOMNesting(...): <th> cannot appear as a child of <thead>.
  const ths = ['name', 'state', 'domains', 'web pages'].map((col)=>{
     return <th>{col}</th>
  })
  const trs =  univs && univs.map((univ, index)=>{
    const { name, 'state-province': state, domains, web_pages}= univ

    const row = <tr style={{backgroundColor: index % 2 === 0 ? 'blue': 'red'}}>
        <td>{name}</td>
        <td>{state || 'none'}</td>
        <td>{domains}</td>
        <td>{web_pages}</td>
      </tr>
      return row
  })

  const table = <table>
    <thead><tr>{ths}</tr></thead>
    <tbody>{trs}</tbody>
  </table>

  return (
    <div>
      <select onChange={handleChange}>
        <option value="-1">Select a country...</option>
        {countries.map((country) => (
          <option key={country.name}>{country.name}</option>
        ))}
      </select>
      {univs && table}
    </div>
  );
};

export default App;
