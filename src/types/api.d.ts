
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

interface NoteRes {
    msg: string
    code: number
    data: Array<Notes>
}

interface Notes {
    id: string
    header: string
    content: string
}

interface NoteReq {
    header: string
    content: string
}

interface Result {
    code: number
    msg: string
    data?: string
}

interface StorePwdReq {
    url: string
    password: string
}

interface GetPwdReq {
    url: string
}


