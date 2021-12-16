import axios from "axios"
import api from "./api"
export default{
    get(props){
        return axios.get(api.getUrl()+'users',api.getAuthHeaders())
    },
    add(user){
        return axios.post(api.getUrl() + 'users',user, api.getAuthHeaders())
    },
    delete(user){
        return axios.delete(api.getUrl() + 'users/'+user.id, api.getAuthHeaders())
    },

    update(user){
        return axios.put(api.getUrl() + 'users/'+user.id,user, api.getAuthHeaders())
    },
    getAll(){
        return axios.get(api.getUrl() + 'areas?all=true', api.getAuthHeaders())
    },
    show(id){
        return axios.get(api.getUrl() + 'users/'+id, api.getAuthHeaders())
    },
    getAnios(){
        return axios.get(api.getUrl() + 'expedientes-years', api.getAuthHeaders())
    },
}
