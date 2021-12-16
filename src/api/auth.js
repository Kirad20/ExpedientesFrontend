import axios from "axios";

import { Cookies } from 'quasar';
import api from "./api";
const ENDPOINT_PATH = "http://127.0.0.1:8000/api/";
export default {
  getToken(){
    return Cookies.get("token");
  },
  hasAccess(name) {
    let roles = this.getRoles();

    switch (name) {

      case "buscar-expediente":
        return true;

      case "Usuarios":
        return roles.includes("administrador")

      case "nuevo-expediente":
        return roles.includes("administrador")||roles.includes("editor");

      case "expediente":
        return true;

      default:
        return false;
    }
  },

  setToken(token){
      Cookies.set("token",token,{
        expires: 7,
      });
  },
  getPermissions(){
    return axios.get(ENDPOINT_PATH + "userRoles",api.getAuthHeaders);
  },
  setUserLogged(user){
    Cookies.set("userLogged",user)
  },
  getUserLogged() {
    return Cookies.get('userLogged')
  },
  getRoles(){
    return this.getUserLogged().roles
  },
  deleteUserLogged() {
    Cookies.remove('userLogged');
    Cookies.remove('token')
  },
  register(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "register", user);
  },
  login(email, password) {
    let form = new FormData()
    form.append('email',email.value)
    form.append('password',password.value)
    return axios.post(ENDPOINT_PATH + "login", form);
  },
  isUser(){
    return this.getUserLogged().rol ==='usuario'
  },
  isAdmin(){
    return this.getUserLogged().rol ==='administrador'
  },
  isSuperAdmin(){
    console.log(this.getUserLogged().rol);
    return this.getUserLogged().rol ==='super-admin'
  }
}
