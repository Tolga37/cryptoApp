
const login = (payload)  => ({
    type : "LOG_IN",
    payload
})
const logOut = (payload) => ({
    type: "LOG_OUT",
    payload
})
const appointInfo = (payload) => ({
    type: "APP_INFO",
    payload
})


export {login,logOut,appointInfo}