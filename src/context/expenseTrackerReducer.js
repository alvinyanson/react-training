export function expenseTrackerReducer(state, action) {
    switch (action.type) {
        case 'add_record': {
            let updatedAccounts = state.accounts.map(account =>
                action.record.type === "Expense" && account.name === action.record.account
                    ? { ...account, balance: Math.max(0, account.balance - action.record.amount) } // Deduct amount, prevent negative balance
                    : account
            );


            return {
                ...state,
                records: [...state.records, action.record], // Add record
                accounts: updatedAccounts // Update accounts balance
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}