import { createContext, useReducer, useContext } from "react";
import { expenseTrackerReducer } from "./expense.reducer";
import { AccountsList, CategoryList, RecordType } from "../data";

const ExpenseContext = createContext(null);

const ExpenseTrackerDispatchContext = createContext(null);

export function RecordsProvider({ children }) {
    const [records, dispatch] = useReducer(
        expenseTrackerReducer,
        {
            records: [],
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
            <ExpenseTrackerDispatchContext.Provider value={dispatch}>
                {children}
            </ExpenseTrackerDispatchContext.Provider>
        </ExpenseContext.Provider>
    );
}

export const useExpense = () => useContext(ExpenseContext);

export const useExpenseDispatch = () => useContext(ExpenseTrackerDispatchContext);