import { ITransaction } from "../types/ITransaction";
import { api } from "./baseApi";

export const transactionsApi = {
  getTransactions: async (): Promise<{ data: ITransaction[] }> =>
    api.get("api/transactions"),
  createTransaction: async (transactionData: Partial<ITransaction>): Promise<{ data: ITransaction }> =>
    api.post("api/transactions/create", transactionData),
  deleteTransaction: (id: number): Promise<{ message: string, deleted: ITransaction }> => {
    return api.delete(`api/transactions/${id}`);
  },
  uploadExcelTransactions: (formData: FormData): Promise<{ message: string, imported: number }> => {
    return api.post("api/transactions/upload-excel", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  editTransaction: () => {},
};
