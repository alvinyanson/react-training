import AddRecordForm from './components/AddRecordForm';
import RecordsList from './components/RecordsList';
import { RecordsProvider } from "./context/ExpenseTrackerContext"

function App() {

  return (
    <RecordsProvider>
      <div className="container py-5 py-2">
        <div className='row'>
          <div className='col-md-4'>
            <AddRecordForm />
          </div>
          <div className='col-md-8'>
            <RecordsList />
          </div>
        </div>
      </div >
    </RecordsProvider>
  )
}

export default App
