import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { sortArray } from '../Util/sortArray';
import { buildChart } from '../Util/buildChart';
//docs/#/Covid-19%3A%20Worldometers/get_v3_covid_19_countries

const BASE_URL = "https://disease.sh/v3/covid-19/countries";
const WORLD_URL = "https://disease.sh/v3/covid-19/historical/all?lastday=120"
const ACTION = {
    REQUEST_DATA: "request-Data",
    GET_DATA: "get-data",
    ERROR: "error-data",
    INFO_COUNTRY: "info-country",
    WORLD_CASES: "world-cases"
}

const initalState = {
    loading: false,
    error: false,
    data: [],
    countryInfo: {},
    tableData: [],
    worldCase: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.REQUEST_DATA:
            return {
                ...state,
                loading: true,
            }
        case ACTION.GET_DATA:
            return {
                ...state,
                loading: false,
                data: action.data,
                tableData: action.table
            }
        case ACTION.ERROR:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.error
            }
        case ACTION.INFO_COUNTRY:
            return {
                ...state,
                loading: false,
                countryInfo: action.info
            }
        case ACTION.WORLD_CASES:
            return {
                ...state,
                loading: false,
                worldCase: action.world
            }

        default: return state;
    }
}

const useFetchData = (optin, country, casesType) => {
    const [state, dispatch] = useReducer(reducer, initalState);
    const url = country === "worldwide" ?
        "https://disease.sh/v3/covid-19/all" :
        `https://disease.sh/v3/covid-19/countries/${country}`;
    useEffect(() => {
        const getCountriesData = async () => {
            dispatch({ type: ACTION.REQUEST_DATA })
            let res;
            try {
                res = optin ? await axios.get(url) : await axios.get(BASE_URL);
                //resJson = res.json();
            } catch (Err) {
                dispatch({ type: ACTION.ERROR, error: Err })
            }
            if (optin) {
                dispatch({ type: ACTION.INFO_COUNTRY, info: res.data })
            }
            else {
                const sortedCountries = sortArray(res.data);
                const countires = res.data.map((country) => {
                    return {
                        name: country.country,
                        value: country.countryInfo,
                    }
                })

                dispatch({ type: ACTION.GET_DATA, data: countires, table: sortedCountries })
            }
        }
        getCountriesData();
    }, [url, optin])


    useEffect(() => {
        const getCountriesData = async () => {
            dispatch({ type: ACTION.REQUEST_DATA })
            let res;
            try {
                res = await axios.get(WORLD_URL);
                //resJson = res.json();
            } catch (Err) {
                dispatch({ type: ACTION.ERROR, error: Err })
            }
            const newWorld = buildChart(res.data, casesType);
            dispatch({ type: ACTION.WORLD_CASES, world: newWorld })

        }
        getCountriesData()
    }, [casesType])

    return state;
}

export default useFetchData;