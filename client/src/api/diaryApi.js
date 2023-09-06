
import axiosClient from './axiosClient'


const diaryApi ={
    create:()=> axiosClient.post('diary'),
    getAll:()=> axiosClient.get('diary'),
    // updatePosition:(params)=> axiosClient.put('diary',params),
    getOne:(id)=>axiosClient.get(`diary/${id}`),
    delete:(id)=>axiosClient.delete(`diary/${id}`),
    update:(id,params) => axiosClient.put(`diary/${id}`,params),
    getFavorites:()=>axiosClient.get('diary/allfavorites')
}

export default diaryApi
