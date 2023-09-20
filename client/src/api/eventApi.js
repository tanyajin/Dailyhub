
import axiosClient from './axiosClient'


const eventApi ={
    create: (data) => axiosClient.post('schedule', data),
    getAll:()=> axiosClient.get('schedule'),
    // getOne:(id)=>axiosClient.get(`diary/${id}`),
    deleteEvent: (id) => axiosClient.delete('schedule', { data: { id: id } }),
    // update:(id,params) => axiosClient.put(`diary/${id}`,params),
    // getFavorites:()=>axiosClient.get('diary/allfavorites')
}

export default eventApi
