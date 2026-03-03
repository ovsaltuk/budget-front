import { ITransaction, TRANSACTION_TYPE_LABELS } from "../../types/ITransaction"
import "./styles.scss";

interface ITransactionProps {
    transactionData: ITransaction
}

export const Transaction = ( data: ITransactionProps) => {
    const {date, type, amount, category, subcategory, comment} = data.transactionData;
    return <div className="transaction__container">
        <div>{TRANSACTION_TYPE_LABELS[type]}</div>
        <div>{new Date(date).toLocaleDateString('ru-RU')}</div>
        <div>{amount}</div>
        <div>{category}</div>
        <div>{subcategory}</div>
        <div>{comment}</div>
    </div>
}