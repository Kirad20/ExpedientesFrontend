import axios from "axios"
import api from "./api"
export default{
    get(props){
        return axios.get(
          api.getUrl()+
          'expedientes?'+
          'mes='+props.mes.id+
          '&anio='+props.anio,
        api.getAuthHeaders())
    },
    add(expediente){
        return axios.post(api.getUrl() + 'expedientes',expediente, api.getAuthFileHeaders())
    },

    update(expediente){
        return axios.put(api.getUrl() + 'expedientes/'+expediente.id,expediente, api.getAuthHeaders())
    },
    getAll(){
        return axios.get(api.getUrl() + 'areas?all=true', api.getAuthHeaders())
    },
    show(id){
        return axios.get(api.getUrl() + 'expedientes/'+id, api.getAuthHeaders())
    },
    getAnios(){
        return axios.get(api.getUrl() + 'expedientes?getYears=true', api.getAuthHeaders())
    },
    downloadByYear(year){
        axios.get(api.getUrl() + 'expedientes-downloadByYear?anio='+year, api.getAuthZipHeaders()).then((response)=>{
            const blob = new Blob([response.data], {
              type: response.data.type
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = year+'.zip'
            link.click()
        })
    },
    downloadByMes(year,mes){
        axios.get(api.getUrl() + 'expedientes-downloadByMes?anio='+year+'&mes='+mes,
                    api.getAuthZipHeaders()).then((response)=>{
            const blob = new Blob([response.data], {
              type: response.data.type
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = year+'-'+mes+'.zip'
            link.click()
        })
    },
    descargarComprimido(id){
        axios.get(api.getUrl() + 'expedientes/'+id+'/comprimido',
                    api.getAuthZipHeaders()).then((response)=>{
            const blob = new Blob([response.data], {
              type: response.data.type
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = id+'.zip'
            link.click()
        })
    }
}
