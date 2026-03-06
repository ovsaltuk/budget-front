export enum ETransactionType {
  INCOME = 'income',   
  OUTCOME = 'outcome',  
}

export const TRANSACTION_TYPE_LABELS: Record<string, string> = {
  income: 'Доход',     
  outcome: 'Расход'    
};

export interface ITransaction {
    id: number,
    userId: number,
    category: string,
    subcategory: string,
    date: string,
    created_at: Date,
    updated_at: Date,
    comment: string,
    amount: string,
    type: ETransactionType
}