export enum ProductActionsTypes{
    GET_ALL_PRODUCTS="[Product] Get All products",
    GET_SELECTED_PRODUCTS="[Product] Get Selected products",
    GET_AVAILABLE_PRODUCTS="[Product] Get All products",
    SEARCH_PRODUCTS="[Product] Get Search products",
    NEW_PRODUCT="[Product] Get New product",
    SELECT_PRODUCT="[Product] Select product",
    EDIT_PRODUCT="[Product] Edit product",
    DELETE_PRODUCT="[Product] Delete product",

}

//on aura un prob si on veut passer a ce event des params(paylaod)
//mieux de faire interface qui contient event et leur param qui sera de type any
export interface ActionEvent{
    type:ProductActionsTypes,
    payload?:any
}

export enum DataStateEnum{
    LOADED,
    LOADING,
    ERROR
}

export interface AppDataState<T>{
    dataState?:DataStateEnum,
    data?:T,
    errorMessage?:string
}