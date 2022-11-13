import request from "./index"

// 注册API
export const RegisterAPI = (params: RegisterAPIReq): Promise<RegisterAPIRes> => request.post("/user/register", params)

// 登录API
export const LoginAPI = (params: LoginAPIReq): Promise<LoginAPIRes> => request.post("/user/login", params)

// 写note
export const WriteNoteApi = (params: NoteReq): Promise<Result> => request.post("notes/writeNotes", params)

// 获取notes
export const GetNotesApi = (): Promise<NoteRes> => request.get("notes/getNotes")

// 存密码
export const StorePwdApi = (params: StorePwdReq): Promise<Result> => request.post("pwdmng/storePwd", params)

// 获取密码
export const GetPwdApi = (params: GetPwdReq): Promise<Result> => request.post("pwdmng/getPwd", params)
