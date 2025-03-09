export function expenseTrackerReducer(state, action) {
    switch (action.type) {
        case 'add_record': {
            return {
                records: [...state.records, action.record]
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}