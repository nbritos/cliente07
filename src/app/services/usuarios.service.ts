import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from "src/app/models/usuarioModel";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  API_URI = 'http://localhost:3000/user';
  usuarios: Usuario[];
  // usuarioLoggeado: Usuario = {};
  private esAdmin: boolean = false;

  constructor(private http: HttpClient) {
    this.usuarios = [];
  }

  listarUsuarios() {
    return this.http.get(`${this.API_URI}/list`);
  }

  buscarUsuario(id: string) {
    return this.http.get(`${this.API_URI}/find/${id}`);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/add`, usuario);
  }

  actualizarUsuario(id: string, actualizaUsuario: Usuario) {
    return this.http.put(`${this.API_URI}/update/${id}`, actualizaUsuario);
  }

  eleminarUsuario(id: string) {
    return this.http.delete(`${this.API_URI}/delete/${id}`);
  }

  loginUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/signin/`, usuario);
  }

  userAdmin(): boolean {
    if (localStorage["rol"] == 'admin') {
      this.esAdmin = true;
      return true;
    }
    return false;
  }

  getEsAdmin() {
    return this.esAdmin;
  }

  setUsuarioLoggeado(usuario: Usuario) {
    // this.usuarioLoggeado = usuario;
    if (usuario.rol) {
      localStorage.setItem('Rol', usuario.rol);
    } else {
      localStorage.removeItem('Rol'); // Elimina la propiedad 'Rol' del Local Storage si no se proporciona un valor para el rol
    }
  }

  setRol(usuario: Usuario) {
    localStorage.setItem('Rol', usuario.rol || '{}');
  }


  guardarUsuarios(usuariosGuardar: Usuario[]) {
    //Recibe un array de usuarios y lo guarda. Sobreescribe el contenido previo.
    this.usuarios = usuariosGuardar;
    //console.log(this.usuarios);
  }

  guardarUsuariosLocal() {
    //Guarda los usuarios del objeto en el LocalStorage
    localStorage.setItem("Usuarios", JSON.stringify(this.usuarios));
  }

  cargarUsuariosLocal() {
    //Carga los usuarios desde el objeto en el LocalStorage
    this.usuarios = JSON.parse(localStorage.getItem("Usuarios") || '{}');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {//Obtenemos el token que despues enviara el interceptor x cada req
    return localStorage.getItem('token');
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('token'); //Si existe token retorna true
    //es el equivalente de testearlo con if pero ahora en una sola linea.
  }

  logOut() {
    localStorage.removeItem('token');
  }

}