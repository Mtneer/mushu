import React from "react";
import { Chart } from 'react-charts'


export const AreaChart = ({spendingSummaryData}) => {

    const data = spendingSummaryData;

    const axes = [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left', stacked: true },
        ];

    const series = {
        type: 'area',
        }

    return (
        <Chart data={data} series={series} axes={axes} tooltip />
    )
}