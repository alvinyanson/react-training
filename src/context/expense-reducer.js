import { RecordsType } from "../data";

export function expenseTrackerReducer(state, action) {
    switch (action.type) {
        case 'add_record': {
            let updatedAccounts = state.accounts.map(account => {
                if (account.name === action.record.account) {
                    let amount = Number(action.record.amount) || 0; // Ensure it's a valid number
                    let balance = Number(account.balance) || 0; // Ensure balance is a number

                    if (action.record.type === RecordsType.EXPENSE) {
                        return { ...account, balance: Math.max(0, balance - amount) };
                    } else {
                        return { ...account, balance: balance + amount };
                    }
                }
                return account; // Return unchanged account if no match
            });

            return {
                ...state,
                records: [...state.records, action.record], // Add record
                accounts: updatedAccounts // Update accounts balance
            };
        }

        case 'delete_record': {

            const records = state.records.filter(record => record.id !== action.record.id);

            const updatedAccounts = state.accounts.map(account => {
                if (account.name === action.record.account) {
                    let amount = Number(action.record.amount) || 0;
                    let balance = Number(account.balance) || 0;

                    return {
                        ...account,
                        balance: action.record.type === RecordsType.EXPENSE
                            ? balance + amount  // Refund if Expense
                            : balance - amount  // Deduct if Income
                    };
                }
                return account; // Return unchanged account
            });

            return { ...state, records, accounts: updatedAccounts };
        }

        case 'edit_record': {

            const records = state.records.map(record =>
                record.id === action.record.id ? { ...action.record } : record
            );
        
            const previousRecord = state.records.find(record => record.id === action.record.id);
            if (!previousRecord) return state; // Safety check in case record doesn't exist
        
            const updatedAccounts = state.accounts.map(account => {
                if (account.name === action.record.account) {
                    let previousAmount = Number(previousRecord.amount) || 0;
                    let newAmount = Number(action.record.amount) || 0;
                    let balance = Number(account.balance) || 0;
        
                    return {
                        ...account,
                        balance: action.record.type === RecordsType.EXPENSE
                            ? balance + previousAmount - newAmount // Add back old, subtract new
                            : balance - previousAmount + newAmount // Subtract old, add new
                    };
                }
                return account;
            });
        
            const resetForm = {
                action: "add",
                type: '',
                account: '',
                amount: '',
                category: '',
                date: new Date().toISOString().split("T")[0]
            };
        
            return { ...state, form: resetForm, records, accounts: updatedAccounts };
        }

        case 'set_form': {
            return {
                ...state,
                form: action.record
            }
        }


        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}