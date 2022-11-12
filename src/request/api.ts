import request from "./index"

// 注册API
export const RegisterAPI = (params: RegisterAPIReq): Promise<RegisterAPIRes> => request.post("/user/register", params)

// 登录API
export const LoginAPI = (params: LoginAPIReq): Promise<LoginAPIRes> => request.post("/user/login", params)