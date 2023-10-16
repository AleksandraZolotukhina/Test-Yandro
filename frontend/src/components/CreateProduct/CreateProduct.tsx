import { useState } from "react"
import { Button } from "../Button/Button"
import styles from './CreateProduct.module.css'
import { DatePicker, Select, message } from "antd"
import dayjs from "dayjs"
import { useCreateProduct } from "../../utils/queries"
import { useQueryClient } from "react-query"
import { TProduct } from "../../types"
import Loader from "../Loader/Loader"
import { hasInStockOptions } from "./utils"

interface ICreateProduct {
    onClose: () => void
}

export const CreateProduct = ({ onClose }: ICreateProduct) => {
    const queryClient = useQueryClient();

    const [newProduct, setNewProduct] = useState({
        name: '',
        weight: '',
        customer: '',
        hasInStock: true,
        orderDate: new Date(),
    })

    const { mutate, isLoading } = useCreateProduct({
        onSuccess: (data: TProduct) => {
            queryClient.setQueryData('products', (products: TProduct[] | undefined) => [...(products as TProduct[]), data])
            message.success('Товар успешно добавлен!')
            onClose()
        },
        onError: (error) => {
            message.error(error.message);
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newProduct.name.trim() === '' || newProduct.weight.trim() === '' || newProduct.customer.trim() === '') {
            message.error('Поля не должны содержать пустых значений');
            return
        }

        mutate(newProduct)
    }

    return (
        <>
            {isLoading && <Loader />}

            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="name">
                    <p className={styles.text}>Наименование товара</p>
                    <input
                        placeholder="Кофта"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className={styles.input}
                        type="text"
                        id="name"
                    />
                </label>
                <label className={styles.label}>
                    <p className={styles.text}>Вес товара, гр.</p>
                    <input
                        placeholder="1000"
                        value={newProduct.weight}
                        onChange={(e) => { e.stopPropagation(); setNewProduct({ ...newProduct, weight: e.target.value }) }}
                        className={styles.input}
                        type="number"
                        id="weight"
                        min={0}
                    />
                </label>
                <label className={styles.label} htmlFor="customer-name">
                    <p className={styles.text}>Имя заказчика</p>
                    <input
                        placeholder="Иван Иванов"
                        value={newProduct.customer}
                        onChange={(e) => setNewProduct({ ...newProduct, customer: e.target.value })}
                        className={styles.input}
                        type="text"
                        id="customer-name"
                    />
                </label>
                <label className={styles.label} htmlFor="date">
                    <p className={styles.text}>Дата и время заказа</p>
                    <DatePicker
                        showTime
                        disabledDate={(currentDate) => new Date(dayjs(currentDate).toDate()).getTime() > new Date().getTime() }
                        className={styles.date}
                        format="DD.MM.YYYY HH:mm"
                        defaultValue={dayjs(newProduct.orderDate)}
                        onChange={(date) => setNewProduct({ ...newProduct, orderDate: new Date(dayjs(date).toDate()) })}
                    />
                </label>

                <label className={styles.label} htmlFor="hasInStock">
                    <p className={styles.text}>Наличие на складе</p>
                    <Select
                        defaultValue={newProduct.hasInStock}
                        onChange={(value) => setNewProduct({ ...newProduct, hasInStock: value })}
                        className={styles.select}
                        id="hasInStock"
                        options={hasInStockOptions}
                    />
                </label>

                <Button type='submit'>Добавить</Button>
            </form>
        </>
    )
}