import { createContext, useReducer, useContext } from "react";
import { expenseTrackerReducer } from "./expense-reducer";
import { AccountsList, CategoryList, DummyRecords, RecordType } from "../data";

const ExpenseContext = createContext(null);

const ExpenseDispatchContext = createContext(null);

export function RecordsProvider({ children }) {
    const [records, dispatch] = useReducer(
        expenseTrackerReducer,
        {
            records: DummyRecords,
            accounts: AccountsList,
            form: {
                action: "add",
                type: RecordType[0].name,
                account: AccountsList[0].name,
                amount: '',
                category: CategoryList[0].name,
                date: new Date().toISOString().split("T")[0]
            }
        }
    );

    return (
        <ExpenseContext.Provider value={records}>
            <ExpenseDispatchContext.Provider value={dispatch}>
                {children}
            </ExpenseDispatchContext.Provider>
        </ExpenseContext.Provider>
    );
}

export const useExpense = () => useContext(ExpenseContext);

export const useExpenseDispatch = () => useContext(ExpenseDispatchContext);