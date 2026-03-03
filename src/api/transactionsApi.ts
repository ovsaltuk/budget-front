import { ITransaction } from "../types/ITransaction";
import { api } from "./baseApi";

export const transactionsApi = {
  getTransactions: async (): Promise<{data: ITransaction[]}> => 
     api.get("api/transactions"),
  createTransactions: () => {},
  deleteTransactions: () => {},
  editTransaction: () => {},
};

