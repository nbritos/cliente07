import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/productModel';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-administrar',
  templateUrl: './productos-administrar.component.html',
  styleUrls: ['./productos-administrar.component.css']
})
export class ProductosAdministrarComponent implements OnInit {

  productos: IProduct[];
  id_select: string = "1";
  indice: number = 0;
  nuevo: IProduct = {};
  actual: IProduct = {};

  errorDescripcion: number = 0;
  errorPrecio: number = 0;

  constructor(private productoService: ProductoService) {
    //this.usuariosService.cargarUsuariosLocal(); //forzamos el uso de la carga local a modo de prueba.
    //this.usuarios = this.usuariosService.listarUsuarios();
    this.productos = [];
    console.log("productos listar");
    console.log(this.productos);
  }

  actualizar() {
    console.log("Elige: " + this.id_select);
    console.log(this.productos);
    this.productoService.actualizarProducto(this.id_select, this.actual).subscribe(
      (res: any) => {
        console.log(res.text);
        this.ngOnInit();
      }

    );
  }

  seleccionaValor($event: any) {
    console.log("Elige: " + this.id_select);
    for (let i = 0; i < this.productos.length; i++) {
      if (this.id_select == this.productos[i].id) {
        this.indice = i;
        break;
      }
    }
    this.productoService.buscarProducto(this.id_select).subscribe(
      (res: any) => {
        console.log(res);
        this.actual = res;
      }
    );
    console.log(this.indice);
  }

  agregar() {
    console.log(this.nuevo);
    this.productoService.guardarProducto(this.nuevo).subscribe(
      (res: any) => {
        console.log(res);
        this.ngOnInit();
        console.log(this.productos);
        this.nuevo = {};
      });
  }

  eliminar($event: any) {
    console.log($event.target.value);
    let id: string = $event.target.value; //Guardamos el id del boton
    this.productoService.eliminarProducto(id).subscribe(
      (res: any) => {
        this.ngOnInit();
        console.log(this.productos);
      }
    );
  }

  ngOnInit(): void {
    this.productoService.listarProductos().subscribe(
      (res: any) => {
        console.log(res);
        this.productos = (res);
        Object.assign(this.actual, this.productos[0]);
        console.log(this.productos);
      }
    );
  }

  /**************************/
  validarCampos(): Boolean {
    console.log("Validando los campos del formulario!!!");
    this.errorDescripcion = this.verificarDescripcion(this.nuevo.descripcion);
    this.errorPrecio = this.verificarPrecio(this.nuevo.precio);
    if ((this.errorDescripcion + this.errorPrecio) > 0) {
      return false;
    }
    return true;
  }

  private verificarDescripcion(palabra: any): number {
    const patron = /^[A-Z][A-Za-z0-9áéíóúüñÑ\s.,\/-]{3,39}$/;
    /**/
    if (palabra === undefined)
      return 1;
    if (palabra.length > 40)
      return 2;
    if (!patron.test(palabra))
      return 3;
    return 0;
  }

  private verificarPrecio(precio: any): number {
    const patron: RegExp = /^\d{1,4}(,\d{1,2})?$/;
    /*
    ^ indica el inicio de la cadena.
    \d{1,4} permite de 1 a 4 dígitos para la parte entera.
    (,\d{1,2})? indica que la coma y los dígitos decimales son opcionales. Los dígitos decimales deben tener de 1 a 2 dígitos.
    $ indica el final de la cadena.
    */
    if (precio === undefined)
      return 1;
    if (precio.length > 4)
      return 2;
    if (!patron.test(precio))
      return 3;
    return 0;
  }


  //*******************************//
}
