import React from 'react'
import { useExpense } from "../context/expense-context";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useGroupedExpenseData from "../hooks/useGroupedExpenseData";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartOverviewByCategory() {
    const state = useExpense();
    const chartData = useGroupedExpenseData(state.records);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Expenses by Category</h5>
                    <Doughnut data={chartData} />
                </div>
            </div>
        </>
    )
}

export default ChartOverviewByCategory