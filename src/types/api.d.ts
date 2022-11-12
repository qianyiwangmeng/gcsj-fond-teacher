interface RegisterAPIReq {
    username: string
    password: string
}

interface RegisterAPIRes {
    msg: string
    code: number
}


interface LoginAPIReq {
    username: string
    password: string
}

interface LoginAPIRes {
    msg: string
    code: number
    token: string
}