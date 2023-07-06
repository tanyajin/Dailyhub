import axiosClient from "./axiosClient";

const userAip = {
    signup: params =>axiosClient.post('user/signup',params),
    login:  params => axiosClient.post('user/login',params),
    verifyToken:()=>axiosClient.post('user/verify-token')
}

export default userAip