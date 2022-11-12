import { combineReducers, legacy_createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk"



const reducers = combineReducers({

})


// 判断有没有  判断有没有__REDUX_DEVTOOLS_EXTENSION_COMPOSE__这个模块
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))

export default store