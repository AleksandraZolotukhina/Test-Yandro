import styles from './App.module.css'
import Loader from '../Loader/Loader';
import { useGetProducts } from '../../utils/queries';
import { ProductsTable } from '../ProductsTable/ProductsTable';
import { Button } from '../Button/Button';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../Modal/Modal';
import { CreateProduct } from '../CreateProduct/CreateProduct';
import { message } from 'antd';

export const App = () => {

  const [showModal, setShowModal] = useState(false);
  const { isLoading, products,  } = useGetProducts({
    onError:  (error) => {
      message.error(error.message)
    }
  });

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Список товаров</h1>
        <Button onClick={() => setShowModal(true)}>Добавить товар</Button>
      </header>
      <main>
        <section className={styles.cards}>
          <ProductsTable products={products} />
        </section>
      </main>

      {showModal && createPortal(
        <Modal onClose={() => setShowModal(false)}>
          <CreateProduct onClose={() => setShowModal(false)} />
        </Modal>,
        document.body
      )}
    </>
  )
}
