import { createStore,combineReducers } from "redux"; 
import loginReducers from "../redux/reducers/loginReducers";
import productReducers from "./reducers/productReducers";
import settingReducers from "./reducers/settingReducers";

const reducers = combineReducers({
    login: loginReducers,
    product: productReducers,
    setting: settingReducers
})
const store = createStore(reducers)


export default store;