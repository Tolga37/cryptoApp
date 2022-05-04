
const setProducts = (payload) => ({
    type: "SET_PRODUCTS",
    payload
})

const addProduct = (payload) => ({
    type: "ADD_PRODUCT",
    payload
})
const deleteProduct = (payload) => ({
    type: "DELETE_PRODUCT",
    payload
})
const updateProduct = (payload) => ({
    type: "UPDATE_PRODUCT",
    payload
})


export default {
    setProducts, addProduct, deleteProduct, updateProduct
}