export type TChangeProduct = Readonly<{
    id: number,
    customer: string,
    hasInStock: boolean
}>

export type TProduct = {
    id: number,
    customer: string,
    hasInStock: boolean,
    orderDate: Date,
    weight: string,
    name: string
}

export type TError = {
    message: string
}
