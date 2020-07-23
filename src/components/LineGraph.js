import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import useFetchData from '../Hooks/useFetchData';



function LineGraph({ casesType }) {
    const [data, setData] = useState({});
    const { loading, error, worldCase } = useFetchData(null, null, casesType)
    useEffect(() => {
        setData(worldCase)
    }, [worldCase])

    const options = {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 0
            }
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: 'll',
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return numeral(value).format("0a")
                        }
                    }
                }
            ]
        }
    }
    if (loading) {
        return <div>Loading</div>
    }
    if (error) {
        return <div>Ops, Error Happen refresh</div>
    }


    return (
        <div style={{ marginTop: "10px", padding: "10px" }}>
            {data.length > 0 ?
                <Line
                    data={{
                        datasets: [{
                            data: data,
                            backgroundColor: "rgba(204,16,52,0.2)",
                            borderColor: "#cc1034"
                        }]
                    }}
                    options={options}
                /> : null}
        </div>
    )
}

export default LineGraph
