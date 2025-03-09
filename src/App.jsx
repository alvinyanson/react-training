import Accounts from './components/Accounts';
import AddRecordForm from './components/AddRecordForm';
import RecordsList from './components/RecordsList';
import { RecordsProvider } from "./context/ExpenseTrackerContext"
import { AccountsList } from './util';


function App() {

  return (
    <RecordsProvider>
      <div className="container py-5 py-2">
        <div className='row'>
          {
            AccountsList.map(account => (
              <div key={account.id} className='col-md-4 col-12'>
                <Accounts account={account} />
              </div>
            ))
          }

        </div>
        <div className='row'>
          <div className='col-md-4 col-12'>
            <AddRecordForm />
          </div>
          <div className='col-md-8 col-12'>
            <RecordsList />
          </div>
        </div>
      </div >
    </RecordsProvider>
  )
}

export default App
