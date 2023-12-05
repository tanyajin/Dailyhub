import axiosClient from './axiosClient'

const sectionApi ={
    create :()=> axiosClient.post('sections'),
    getAll:()=> axiosClient.get('sections'),
    update:(sectionId,params) => axiosClient.put(`/sections/${sectionId}`,params),
    delete:(sectionId)=> axiosClient.delete(`/sections/${sectionId}`)
}

export default sectionApi