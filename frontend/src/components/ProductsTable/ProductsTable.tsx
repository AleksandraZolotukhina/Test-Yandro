import { Table, TableProps } from "antd";
import { TableProductsActions } from "../TableProductsActions/TableProductsActions";
import { TChangeProduct, TProduct } from "../../types";
import { useState } from "react";
import { SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs"

interface IProductsTable {
    products: TProduct[]
}

export const ProductsTable = ({ products }: IProductsTable) => {
    const [sortedInfo, setSortedInfo] = useState<SorterResult<TProduct>>({});

    const productTableColumns = [
        {
            title: 'ID товара',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
        },
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: { name: string }, b: { name: string }) => (a.name).localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        },
        {
            title: 'Вес, гр.',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Дата заказа',
            dataIndex: 'orderDate',
            key: 'orderDate',
            sorter: (a: { orderDate: Date }, b: { orderDate: Date }) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
            sortOrder: sortedInfo.columnKey === 'orderDate' ? sortedInfo.order : null,
            render: (value: string) => dayjs(value).format('DD.MM.YYYY HH:mm'),
        },
        {
            title: 'В наличии',
            dataIndex: 'hasInStock',
            key: 'hasInStock',
            render: (value: boolean) => value ? 'Да' : 'Нет',
        },
        {
            title: 'Имя заказчика',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Действия',
            key: 'action',
            render: ({ id, customer, hasInStock }: TChangeProduct) => {
                return <TableProductsActions id={id} customer={customer} hasInStock={hasInStock} />
            }
        },
    ];

    const handleChange: TableProps<TProduct>['onChange'] = (pagination, filters, sorter) => {
        setSortedInfo(sorter as SorterResult<TProduct>);
    }

    return (
        <Table
            size="middle"
            dataSource={products}
            scroll={{
                scrollToFirstRowOnChange:true,
                x: 'max-content'
            }}
            columns={productTableColumns}
            onChange={handleChange}
            rowKey="id"
        />
    )
}