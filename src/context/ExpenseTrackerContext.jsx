import { createContext, useReducer, useContext } from "react";
import { expenseTrackerReducer } from "./expenseTrackerReducer";

const ExpenseTrackerContext = createContext(null);

const ExpenseTrackerDispatchContext = createContext(null);

export function useExpense() {
    return useContext(ExpenseTrackerContext);
}

export function useExpenseDispatch() {
    return useContext(ExpenseTrackerDispatchContext);
}

export function RecordsProvider({ children }) {
    const [records, dispatch] = useReducer(
        expenseTrackerReducer,
        { records: [] }
    );

    return (
        <ExpenseTrackerContext.Provider value={records}>
            <ExpenseTrackerDispatchContext.Provider value={dispatch}>
                {children}
            </ExpenseTrackerDispatchContext.Provider>
        </ExpenseTrackerContext.Provider>
    );
}