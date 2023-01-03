import request from "./index"

// 注册API
export const RegisterAPI = (params: RegisterAPIReq): Promise<RegisterAPIRes> => request.post("/user/register", params)

// 登录API
export const LoginAPI = (params: LoginAPIReq):Promise<any> => request.post("/sys/teacherLogin", params)

// 获取老师负责的实验室
export const GetLbsApi = (): Promise<any> => request.get("/teacher/findLaboratory")

// 查询实验室里面学生列表  /laboratory/findStudent
export const GetLbStudentsApi = (params: {id:string,pageNo:number,pageSize:number}): Promise<any> =>
         request.get(`/laboratory/findStudent?id=${params.id}&pageNo=${params.pageNo}&pageSize=${params.pageSize}`)

// 向实验室里面新增学生
export const AddStudentApi = (params:{laboratoryId:string,studentNumber:string,studentName:string}): Promise<any> => request.post("/laboratory/addStudent",params)

// 删除实验室里面的学生
export const DelStudentApi = (params:{id:string}): Promise<any> => request.delete(`/laboratory/deleteStudent?id=${params.id}`)

// 查询实验室周报
export const FindLabReportApi = (params: {id:string,pageNo:number,pageSize:number}): Promise<any> => request.get(`/weeklyReport/findLaboratoryReport?id=${params.id}&pageNo=${params.pageNo}&pageSize=${params.pageSize}`)

// 查询周报详情
export const ReportDetailApi = (params:{id:string}): Promise<any> => request.get(`/weeklyReport/findDetail?id=${params.id}`)



