import { ITransaction } from "../types/ITransaction";
import { api } from "./baseApi";

export const transactionsApi = {
  getTransactions: async (): Promise<{ data: ITransaction[] }> =>
    api.get("api/transactions"),
  createTransaction: async (transactionData: Partial<ITransaction>): Promise<{ data: ITransaction }> =>
    api.post("api/transactions/create", transactionData),
  createTransactions: () => {},
  deleteTransactions: () => {},
  editTransaction: () => {},
};
