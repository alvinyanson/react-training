export const RecordsType = {
  EXPENSE: 'Expense',
  INCOME: 'Income',
} as const

export const AccountsType = {
  SAVINGS: 'Savings',
  CASH: 'Cash',
  DIGITAL_BANK: 'Digital Bank',
  EMERGENCY_FUND: 'Emergency Fund',
} as const

export const CategoriesType = {
  FOOD_BEVERAGES: 'Food & Beverages',
  SHOPPING: 'Shopping',
  HOUSING: 'Housing',
  TRANSPORTATION: 'Transportation',
  VEHICLE: 'Vehicle',
  LIFE_ENTERTAINMENT: 'Life & Entertainment',
  COMMUNICATION_PC: 'Communication, PC',
  FINANCIAL_EXPENSES: 'Financial Expenses',
  INCOME: 'Income',
  OTHERS: 'Others',
} as const

export const AccountsList = [
  {
    id: 1,
    name: 'Savings',
    balance: 100000,
  },
  {
    id: 2,
    name: 'Cash',
    balance: 50000,
  },
  {
    id: 3,
    name: 'Digital Bank',
    balance: 70000,
  },
  {
    id: 4,
    name: 'Emergency Fund',
    balance: 169500,
  },
]

export const RecordsList = [
  {
    id: 1,
    name: 'Expense',
  },
  {
    id: 2,
    name: 'Income',
  },
]

export const CategoryList = [
  {
    id: 1,
    name: 'Food & Beverages',
  },
  {
    id: 2,
    name: 'Shopping',
  },
  {
    id: 3,
    name: 'Housing',
  },
  {
    id: 4,
    name: 'Transportation',
  },
  {
    id: 5,
    name: 'Vehicle',
  },
  {
    id: 6,
    name: 'Life & Entertainment',
  },
  {
    id: 7,
    name: 'Communication, PC',
  },
  {
    id: 8,
    name: 'Financial Expenses',
  },
  {
    id: 9,
    name: 'Income',
  },
  {
    id: 10,
    name: 'Others',
  },
]

export const DummyRecords = [
  {
    activeEdit: false,
    type: 'Expense',
    account: 'Savings',
    amount: '100',
    category: 'Food & Beverages',
    date: '2025-03-12',
    id: 'fe2e4a05-a58f-4a9d-bf9c-eb9c357098e7',
  },
  {
    activeEdit: false,
    type: 'Expense',
    account: 'Cash',
    amount: '100',
    category: 'Shopping',
    date: '2025-03-12',
    id: '5e5d88e4-c9f2-4710-8c5f-5caf04757a9c',
  },
  {
    activeEdit: false,
    type: 'Expense',
    account: 'Cash',
    amount: '100',
    category: 'Housing',
    date: '2025-03-12',
    id: 'bc632ca3-9ce0-4a9b-a626-9870afbea778',
  },
  {
    activeEdit: false,
    type: 'Expense',
    account: 'Cash',
    amount: '100',
    category: 'Transportation',
    date: '2025-03-12',
    id: '768522be-2024-4085-8da1-c8a1a0d2bb45',
  },
  {
    activeEdit: false,
    type: 'Expense',
    account: 'Cash',
    amount: '100',
    category: 'Vehicle',
    date: '2025-03-12',
    id: '265ddbc9-7266-4900-870b-65e360a01c2c',
  },
  {
    activeEdit: false,
    type: 'Income',
    account: 'Emergency Fund',
    amount: '500',
    category: 'Vehicle',
    date: '2025-03-12',
    id: '265ddbc9-7266-4900-870b-65e360a01c2D',
  },
]

export const InitialAppState = {
  records: DummyRecords,
  accounts: AccountsList,
  form: {
    amount: '',
    type: RecordsType.EXPENSE,
    account: AccountsType.SAVINGS,
    category: CategoriesType.FINANCIAL_EXPENSES,
    date: new Date().toISOString().split('T')[0],
  },
}
