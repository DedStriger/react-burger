import { Dispatch } from "redux";

export type ingridientType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type refreshType = {
    checkEmail: boolean;
    request: boolean;
    error: boolean;
    passResetRequest: boolean;
    passResetError: boolean;
    passResetSuccess: boolean;
}

export type ingridientsType = {
    burgerIngridients: never[];
    burgerIngridientsRequest: boolean;
    burgerIngridientsError: boolean;
}

export type userType = {
    email: string;
    name: string;
    error: boolean;
    request: boolean;
    auth: boolean;
    logoutRequest: boolean;
    logoutError: boolean;
    logoutSuccess: boolean;
    pass?: string;
}

export type orderType = {
    orderNumber: null;
    orderNumberRequest: boolean;
    orderNumberError: boolean;
    orderShow: boolean;
}

export type modalType = {
    activeModal: ingridientType | null
}

export type constructorType = {
    constructorList: ingridientType[];
    bun: ingridientType;
    uuids: never[];
}

export type storeType = {
    con: constructorType;
    modal: modalType;
    order: orderType;
    ingridients: ingridientsType;
    refresh: refreshType;
    user: userType;
}
