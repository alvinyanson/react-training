import { useMemo } from 'react'
import { Record } from '@/type'

const useGroupedExpenseData = (records: Record[]) => {
  const data = useMemo(() => {
    const groupedData = records
      .filter((record) => record.type === 'Expense')
      .reduce((acc, record) => {
        if (!acc[record.category]) {
          acc[record.category] = 0
        }
        acc[record.category] += Number(record.amount)
        return acc
      }, {})

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: 'Amount',
          data: Object.values(groupedData),
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
    }
  }, [records])

  return data
}

export default useGroupedExpenseData
