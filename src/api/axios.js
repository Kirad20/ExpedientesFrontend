import axios from "axios";
import api from "../api/api";
export default{
    post(module){
        return axios.get(api.getUrl() + 'folios', api.config)
    }
}