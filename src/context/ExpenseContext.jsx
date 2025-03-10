import { createContext, useReducer, useContext } from "react";
import { expenseTrackerReducer } from "./expense.reducer";
import { AccountsList } from "../data";

const ExpenseContext = createContext(null);

const ExpenseTrackerDispatchContext = createContext(null);

export function RecordsProvider({ children }) {
    const [records, dispatch] = useReducer(
        expenseTrackerReducer,
        { records: [], accounts: AccountsList }
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