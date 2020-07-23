import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const CasesTypeColor = {
    cases: {
        hex: "#cc1034",
        rgb: 'rgb(204,16,52)',
        half_op: 'rgba(204,16,52,0.5)',
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: 'rgb(125,215,29)',
        half_op: 'rgba(125,215,29,0.5)',
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: 'rgb(251,68,67)',
        half_op: 'rgba(251,68,67,0.5)',
        multiplier: 2000,
    }
}


//draw circle on the map with tooltips
export const showDataOnMap = (data, casesType = "cases") => {
    if (data.length > 0) {
        return data.map(country => {
            return <Circle key={country.countryInfo.iso2}
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.5}
                color={CasesTypeColor[casesType].hex}
                fillColor={CasesTypeColor[casesType].hex}
                radius={
                    Math.sqrt(country[casesType]) * CasesTypeColor[casesType].multiplier}
            >
                <Popup className="info-container">
                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <h3>{country.country}</h3>
                    <h4> cases: {numeral(country.cases).format("0,0")}</h4>
                    <h4> recovered: {numeral(country.recovered).format("0,0")}</h4>
                    <h4>Deaths: {numeral(country.deaths).format("0,0")}</h4>
                </Popup>
            </Circle>
        })
    }
}

