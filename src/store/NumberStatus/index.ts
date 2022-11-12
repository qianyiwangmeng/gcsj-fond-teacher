
const store = {
    state: {
        num: 20
    },

    actions: {
        add1(newState: { num: number }, actions: { type: string }) {
            newState.num++
        },
        add2(newState: { num: number }, actions: { type: string, val: number }) {
            newState.num += actions.val
        }
    },

    asyncActions: {
        asyncAdd1(dispatch: Function) {
            setTimeout(() => {
                dispatch({ type: "add1" })
            }, 2000)
        }
    },

    actionNames: {}
}

let actionNames = {}
// actionNames有多少对键值对，取决于action里面有多少个函数。所以遍历store.actions，给actionNames添加键值对
for (let key in store.actions) {
    actionNames[key] = key
}
store.actionNames = actionNames;

export default store


