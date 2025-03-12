import React from 'react'
import { useExpense } from "../context/ExpenseContext";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartOverviewByCategory() {
    const state = useExpense();

    console.log('state', state.records.map(record => record.amount))

    const groupedData = state.records
        .filter(record => record.type === "Expense")
        .reduce((acc, record) => {
            if (!acc[record.category]) {
                acc[record.category] = 0;
            }
            acc[record.category] += Number(record.amount);
            return acc;
        }, {});

    const labels = Object.keys(groupedData);
    const dataValues = Object.values(groupedData);

    const data = {
        labels,
        datasets: [
            {
                label: 'Amount',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Overview by Category</h5>
                    <Doughnut data={data} />
                </div>
            </div>
        </>
    )
}

export default ChartOverviewByCategory