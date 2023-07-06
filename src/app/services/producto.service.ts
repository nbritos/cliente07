import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/productModel';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  API_URI = 'http://localhost:3000/product';
  productos: IProduct[];

  constructor(private http: HttpClient) {
    this.productos = [];
  }

  listarProductos() {
    return this.http.get(`${this.API_URI}/list`);
  }

  buscarProducto(id: string) {
    return this.http.get(`${this.API_URI}/find/${id}`);
  }

  guardarProducto(producto: IProduct){
    return this.http.post(`${this.API_URI}/add`,producto);
  }

  actualizarProducto(id:string, actualizaProducto: IProduct){
    return this.http.put(`${this.API_URI}/update/${id}`,actualizaProducto);
  }

  eliminarProducto(id:string){
    return this.http.delete(`${this.API_URI}/delete/${id}`);
  }

  // loginUsuario(usuario:Usuario){
  //   return this.http.post(`${this.API_URI}/signin/`,usuario);
  // }

  guardarProductos(productosGuardar: IProduct[]) {
    this.productos = productosGuardar;
  }

  guardarProductosLocal() {
    localStorage.setItem("Productos", JSON.stringify(this.productos));
  }

  cargarProductosLocal() {
    //Carga los usuarios desde el objeto en el LocalStorage
    this.productos = JSON.parse(localStorage.getItem("Productos") || '{}');
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