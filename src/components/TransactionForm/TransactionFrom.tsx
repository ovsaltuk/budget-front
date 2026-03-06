import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionValues } from "./schema";
import "./transactionFormStyles.scss";
import { transactionsApi } from "../../api/transactionsApi";
import { ETransactionType } from "../../types/ITransaction";

export const TransactionForm = () => {
    const { register, handleSubmit, formState } = useForm<TransactionValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type: 'outcome',
            category: '',
            subcategory: '',
            date: new Date().toISOString().split('T')[0],
            amount: '',
        }
    })

    const onSubmit = (data: TransactionValues) => {
        const transactionData = {
            ...data,
            type: data.type as ETransactionType,

        };
        console.log('🔍 ОТПРАВЛЯЕМ:', transactionData);
        transactionsApi.createTransaction(transactionData);
    };

    const onError = (errors: any) => {
        console.log('❌ Ошибки валидации:', errors);  // ← ДОБАВЬ ЭТО!
    };

    return <form className="transaction-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <input type="date" {...register('date')} />
        <select
            {...register('type')}
        >
            <option value="income">Доход</option>
            <option value="outcome">Расход</option>
        </select>
        <input type="text" placeholder="категория" {...register('category')} />
        <input type="text" placeholder="подкатегория" {...register('subcategory')} />
        <input type="number" placeholder="сумма" {...register('amount')} />
        {/* <input type="text" placeholder="комментарий" {...register('comment')} />/ */}
        <button type='submit' disabled={formState.isSubmitting}>добавить</button>
    </form>
}

