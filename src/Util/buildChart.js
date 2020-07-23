export const buildChart = (res, casesType = "cases") => {

    const chartInfo = [];
    let lastDataPoint;

    Object.keys(res[casesType]).forEach((dt) => {
        if (lastDataPoint) {
            const newDataPoint = {
                x: dt,
                y: res[casesType][dt] - lastDataPoint
            }
            chartInfo.push(newDataPoint);
        }
        lastDataPoint = res[casesType][dt];
    })
    return chartInfo;
}