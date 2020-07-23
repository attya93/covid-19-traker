import React from 'react'
import './Table.css';
import { prettyPrintStary } from '../Util/handleNumber'
function Table({ countries }) {
    return (
        <div className="table">
            {countries.map((country, index) => {
                return <tr key={country.country}>
                    <td>{index}</td>
                    <td>{country.country}</td>
                    <td><strong>{prettyPrintStary(country.cases)}</strong></td>
                </tr>
            })}
        </div>
    )
}

export default Table
