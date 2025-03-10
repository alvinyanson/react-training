import { RecordsType } from "../data";

export function expenseTrackerReducer(state, action) {
    switch (action.type) {
        case 'add_record': {
            let updatedAccounts = state.accounts.map(account => {
                if (account.name === action.record.account) {
                    if (action.record.type === RecordsType.EXPENSE) {
                        return { ...account, balance: Math.max(0, account.balance - Number(action.record.amount)) };
                    } else {
                        return { ...account, balance: account.balance + Number(action.record.amount) };
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

            const updatedAccounts = state.accounts.map(account =>
                account.name === action.record.account
                    ? { ...account, balance: account.balance + Number(action.record.amount) }
                    : account
            );

            return { ...state, records, accounts: updatedAccounts };
        }


        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}