import React, { useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet';

import useFetchData from '../Hooks/useFetchData';
import { showDataOnMap } from '../Util/showDataOnMap';

import "leaflet/dist/leaflet.css";
import './Map.css'
function Maps({ country, getInfo, zoom, center, countries, casses }) {
    const { countryInfo } = useFetchData(true, country);
    useEffect(() => {
        getInfo(countryInfo)

    }, [countryInfo, getInfo])

    return (
        <div className="map">
            <Map center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                ></TileLayer>
                {/* loop to add circle red */}
                {showDataOnMap(countries, casses)}
            </Map>
        </div>
    )
}

export default Maps
