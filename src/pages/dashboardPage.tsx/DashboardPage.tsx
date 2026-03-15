import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '../../api/transactionsApi';
import { ITransaction } from '../../types/ITransaction';
import { Transaction } from '../../components/Transaction/Transaction';
import { TransactionForm } from '../../components/TransactionForm/TransactionFrom';
import { ExcelUploader } from '../../components/ExcelUploader/ExcelUploader';

export const DashboardPage = () => {
  const {
    data: transactions = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['transactions'],        // уникальный ключ кэша
    queryFn: async () => {
      const response = await transactionsApi.getTransactions();
      return response.data;            // массив транзакций из API
    },
  });

  // Состояния загрузки и ошибок
  if (isLoading) return <div>⏳ Загрузка транзакций...</div>;

  if (error)
    return (
      <div>
        ❌ Ошибка: {(error as Error).message}
        <button
          onClick={() => refetch()}

        >
          🔄 Повторить
        </button>
      </div>
    );

  return (
    <div>
      <TransactionForm />
      <ExcelUploader />
      <div>
        {transactions.length === 0 ? (
          <p>Нет транзакций. Создайте первую!</p>
        ) : (
          transactions.map((transaction: ITransaction) => (
            <Transaction transactionData={transaction} key={transaction.id} />
          ))
        )}
      </div>
    </div>

  );
};
