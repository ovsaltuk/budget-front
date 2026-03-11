import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsApi } from "../../api/transactionsApi";
import { ITransaction, TRANSACTION_TYPE_LABELS } from "../../types/ITransaction"
import "./styles.scss";

interface ITransactionProps {
    transactionData: ITransaction
}

export const Transaction = (data: ITransactionProps) => {
    const { date, type, amount, category, subcategory, comment, id } = data.transactionData;
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (transactionId: number) => transactionsApi.deleteTransaction(transactionId), // ✅ Promise
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: (error) => {
            console.error('Ошибка удаления:', error);
            alert('Ошибка удаления транзакции');
        }
    });

    const handleDelete = () => {
        if (window.confirm(`Удалить транзакцию ${amount} ${category}?`)) {
            deleteMutation.mutate(id);
        }
    };





    return <div className="transaction__container">
        <div>{TRANSACTION_TYPE_LABELS[type]}</div>
        <div>{new Date(date).toLocaleDateString('ru-RU')}</div>
        <div>{amount}</div>
        <div>{category}</div>
        <div>{subcategory}</div>
        <div>{comment}</div>
        <button onClick={handleDelete}>delete</button>
    </div>
}