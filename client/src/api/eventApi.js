
import axiosClient from './axiosClient'


const eventApi ={
    create: (data) => axiosClient.post('schedule', data),
    getAll:()=> axiosClient.get('schedule'),
    // getOne:(id)=>axiosClient.get(`diary/${id}`),
    // delete:(id)=>axiosClient.delete(`diary/${id}`),
    // update:(id,params) => axiosClient.put(`diary/${id}`,params),
    // getFavorites:()=>axiosClient.get('diary/allfavorites')
}

export default eventApi
