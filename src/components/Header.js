import React, { useState, useEffect } from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'


import useFetchData from '../Hooks/useFetchData';
function Header({ getCountry, getTableData }) {

    const [countries, setCountries] = useState([]);
    const { loading, error, data, tableData } = useFetchData();
    const [country, setCountry] = useState('worldwide');

    useEffect(() => {
        setCountries(data)
        getTableData(tableData)
    }, [data, getTableData, tableData])

    if (loading) {
        return <div>Loading</div>
    }
    if (error) {
        return <div>Ops, Error Happen refresh</div>
    }
    const onChangeHandler = (ev) => {
        const countryCode = ev.target.value;
        const countryInfo = countries.find(count => count.value.iso2 === countryCode);
        setCountry(countryCode);
        getCountry(countryCode, countryInfo, data);
    }

    return (
        <div className="app__header">
            <h1>Covid 19 Tracker</h1>
            <FormControl className="app__deopdown">
                <Select
                    variant="outlined"
                    value={country} onChange={onChangeHandler}>
                    <MenuItem value="worldwide">World Wide</MenuItem>
                    {
                        countries.map((country) => {
                            return <MenuItem key={country.name} value={country.value.iso2}>{country.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default Header
