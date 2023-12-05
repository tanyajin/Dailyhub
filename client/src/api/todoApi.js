
import axiosClient from './axiosClient'


const todoApi ={
    create:(params)=> axiosClient.post('todo',params),
    getAll:()=> axiosClient.get('todo'),
    //update:(id,params) => axiosClient.put(`todo/update/${id}`,params),
    complete:(id)=>axiosClient.put(`todo/complete/${id}`),
    delete: (id) => axiosClient.delete(`todo/delete/${id}`)
}

export default todoApi
