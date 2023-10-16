import { useMutation, useQuery } from "react-query";
import { customAxios } from "./axios";
import { TUseChangeProductOptions, TUseCreateProductOptions, TUseDeleteProductOptions, TUseGetProductOptions } from "../types/queries";

export const useGetProducts = (options: TUseGetProductOptions) => {
    const { isLoading, error, data: products } = useQuery('products', () => {
        return customAxios.get('/products')
            .then((response) => response.data)
            .catch((error) => { throw new Error(error?.response?.data?.message ?? error.message) })
        }, options);

    return { isLoading, products, error }
}

export const useDeleteProduct = (options: TUseDeleteProductOptions) => {
    const { mutate, isLoading } = useMutation(async (id: number) => {
        return customAxios.delete(`/products/${id}`)
            .then((response) => response.data)
            .catch((error) => { throw new Error(error?.response?.data?.message ?? error.message) })
    }, options)

    return { mutate, isLoading }
}

export const useChangeProduct = (options: TUseChangeProductOptions) => {
    const { mutate, isLoading } = useMutation(({ id, hasInStock, customer }) => {
        return customAxios.patch(`/products/${id}`, { hasInStock, customer })
            .then((response) => response.data)
            .catch((error) => { throw new Error(error?.response?.data?.message ?? error.message) })
    }, options)

    return { mutate, isLoading }
}

export const useCreateProduct = (options: TUseCreateProductOptions) => {
    const { mutate, isLoading } = useMutation(body => {
        return customAxios.post('/products', body)
            .then((response) => response.data.data)
            .catch((error) => { throw new Error(error?.response?.data?.message ?? error.message) })
    }, options)

    return { mutate, isLoading }
}