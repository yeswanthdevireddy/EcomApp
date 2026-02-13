import api from "../api/axios";

export const checkOutApi=()=>
        api.post("/orders/user/checkout");


export const getMyOrdersApi=()=>
    api.get("/orders/user/my");

export const getAdminSoldProductsApi=()=>
    api.get("/orders/admin/my");