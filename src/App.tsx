import Accounts from '@/components/Accounts'
import AddRecordForm from '@/components/AddRecordForm'
import ChartOverviewByCategory from '@/components/ChartOverviewByCategory'
import RecordsList from '@/components/RecordsList'
import { RecordsProvider } from '@/context/expense-context'

function App() {
  return (
    <RecordsProvider>
      <div className="container py-5 py-2">
        <div className="row mb-4">
          <Accounts />
        </div>
        <div className="row">
          <div className="col-md-4 col-12">
            <AddRecordForm />
          </div>
          <div className="col-md-8 col-12">
            <RecordsList />
            <ChartOverviewByCategory />
          </div>
        </div>
      </div>
    </RecordsProvider>
  )
}

export default App
