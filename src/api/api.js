import auth  from "./auth";
import config from "./config";

export default {
    getUrl(){
       return config.getEndpoint();
    },
    getAuthHeaders(){
        console.log(auth.getToken())
        return {
            headers: {
                Authorization: "Bearer " + auth.getToken(),
            }
        }
    },
    getAuthBlobHeaders(){
        console.log(auth.getToken())
        return {
            headers: {
                Authorization: "Bearer " + auth.getToken(),
                Accept: 'application/octet-stream'
            },

        }
    },
    getAuthZipHeaders(){
        console.log(auth.getToken())
        return {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + auth.getToken(),
            }

        }
    },
    getAuthFileHeaders(){
            return {
                headers: {
                    Authorization: "Bearer " + auth.getToken(),
                    'Content-Type': 'multipart/form-data'
                }
              }


    },
}
