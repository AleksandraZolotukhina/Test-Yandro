import { Select, message } from "antd";
import { Button } from "../Button/Button";
import styles from './ChangeProduct.module.css';
import { TChangeProduct } from "../../types";
import { useState } from "react";
import { useChangeProduct } from "../../utils/queries";
import { useQueryClient } from "react-query";
import Loader from "../Loader/Loader";

interface IChangeProduct {
    onClose: () => void
}

export const ChangeProduct = ({ id, customer, hasInStock, onClose }: TChangeProduct & IChangeProduct) => {

    const [customerName, setCustomerName] = useState(customer);
    const [hasInStockState, setHasInStockState] = useState(hasInStock);

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useChangeProduct({
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            message.success('Товар успешно изменен!');
            onClose()
        },
        onError: (error: {message: string}) => {
            message.error(error.message);
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (customerName.trim() === '') {
            message.error('Имя заказчика не может быть пустым');
            return
        }

        mutate({ id: id, customer: customerName, hasInStock: hasInStockState })
    }

    return (
        <>
            {isLoading && <Loader />}

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <label className={styles.label} htmlFor="customer-name">
                    <p className={styles.text}>Имя заказчика</p>
                    <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={styles.input}
                        type="text"
                        id="customer-name"
                    />
                </label>

                <label className={styles.label} htmlFor="hasInStock">
                    <p className={styles.text}>Наличие на складе</p>
                    <Select
                        defaultValue={hasInStockState}
                        onChange={(value) => setHasInStockState(value)}
                        className={styles.select}
                        id="hasInStock"
                        options={[{ value: true, label: 'Да' }, { value: false, label: 'Нет' }]}
                    />
                </label>

                <Button type='submit'>Сохранить изменения</Button>
            </form>
        </>
    )
}