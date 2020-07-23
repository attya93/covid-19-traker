import React, { useState, useCallback } from 'react';

import Header from './components/Header';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import { Card, CardContent } from '@material-ui/core';

import { prettyPrintStary } from './Util/handleNumber';
import './App.css';

// https://disease.sh/v3/covid-19/countries

function App() {


  const [country, setCountry] = useState("worldwide");
  const [infoCountry, setInfoCountry] = useState({});
  const [worlds, setWorlds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoon, setMapZoom] = useState(3);
  const [casesType, setCsessType] = useState("cases");





  const getUserSelectCountry = useCallback((country, info, world) => {
    setCountry(country);
    setMapCenter({ lat: info.value.lat, lng: info.value.long });
    setMapZoom(5);
  }, [])
  const getInfoOfCountry = (info) => {
    setInfoCountry(info)

  }

  const getTableData = useCallback((tableData) => {
    setTableData(tableData);
    setWorlds(tableData);
  }, []);


  return (
    <div className="app">
      <div className="app__left">
        <Header getCountry={getUserSelectCountry} getTableData={getTableData} />
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCsessType("cases")}
            title="Corona Virus cases"
            total={prettyPrintStary(infoCountry.cases)}
            cases={prettyPrintStary(infoCountry.todayCases)} />

          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCsessType("recovered")}
            title="Recoverd"
            total={prettyPrintStary(infoCountry.recovered)}
            cases={prettyPrintStary(infoCountry.todayRecovered)} />

          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCsessType("deaths")}
            title="Deaths"
            total={prettyPrintStary(infoCountry.deaths)}
            cases={prettyPrintStary(infoCountry.todayDeaths)} />
        </div>
        <Map casses={casesType} country={country} countries={worlds} getInfo={getInfoOfCountry} zoom={mapZoon} center={mapCenter} />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3>World Wide New {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
