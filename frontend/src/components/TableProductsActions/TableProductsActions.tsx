import { Popconfirm, Space, message } from "antd";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../Modal/Modal";
import { ChangeProduct } from "../ChangeProduct/ChangeProduct";
import { TChangeProduct } from "../../types";
import { useQueryClient } from "react-query";
import { useDeleteProduct } from "../../utils/queries";
import deleteSvg from '../../images/delete.svg'
import editSvg from '../../images/edit.svg'
import styles from './TableProductsActions.module.css'
import Loader from "../Loader/Loader";

export const TableProductsActions = ({ id, customer, hasInStock }: TChangeProduct) => {
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);

    const { mutate, isLoading } = useDeleteProduct({
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
        onError: (error) => {
            message.error(error.message);
        }
    })

    return (
        <>
            {isLoading && <Loader />}

            <Space size="middle">
                <button className={styles.button} type="button" onClick={() => setShowModal(true)}>
                    <img className={styles.image} src={editSvg} alt="Изменить" />
                </button>
                <Popconfirm title="Вы уверены, что хотите удалить товар?" onConfirm={() => mutate(id)} >
                    <button className={styles.button} type="button">
                        <img className={styles.image} src={deleteSvg} alt="Удалить" />
                    </button>
                </Popconfirm>
            </Space>
            {showModal && createPortal(
                <Modal onClose={() => setShowModal(false)}>
                    <ChangeProduct id={id} customer={customer} hasInStock={hasInStock} onClose={() => setShowModal(false)} />
                </Modal>,
                document.body
            )}
        </>
    )
}