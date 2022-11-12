import handleNum from "./index"

// 就是来管理数据的
let reducer = (state = { ...handleNum.state }, action: { type: string }) => {
    // 调用dispatch执行这里的的代码

    let newState = JSON.parse(JSON.stringify(state))

    for (let key in handleNum.actionNames) {
        // key是每一个键
        // 判断是不是相等
        // if(action.type==="add1"){
        if (action.type === handleNum.actionNames[key]) {
            handleNum.actions[handleNum.actionNames[key]](newState, action);
            break;
        }
    }

    return newState
}
export default reducer