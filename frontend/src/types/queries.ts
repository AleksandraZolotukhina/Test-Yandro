import { UseMutationOptions, UseQueryOptions } from "react-query";
import { TError, TProduct } from ".";

export type TUseGetProductOptions = Omit<UseQueryOptions<any, TError, any, "products">, "queryKey" | "queryFn"> | undefined;
export type TUseDeleteProductOptions = Omit<UseMutationOptions<any, TError, number, unknown>, "mutationFn"> | undefined;
export type TUseChangeProductOptions = Omit<UseMutationOptions<any, TError, Readonly<{ id: number; customer: string; hasInStock: boolean; }>, unknown>, "mutationFn"> | undefined;
export type TUseCreateProductOptions = Omit<UseMutationOptions<any, TError, Omit<TProduct, "id">, unknown>, "mutationFn"> | undefined;
