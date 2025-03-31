import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import useGroupedExpenseData from '../hooks/useGroupedExpenseData'
import { ExpenseState } from '../types'
import { useExpense } from '../hooks/useExpense'

ChartJS.register(ArcElement, Tooltip, Legend)

function ChartOverviewByCategory() {
  const state = useExpense() as ExpenseState
  const chartData = useGroupedExpenseData(state.records)

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
