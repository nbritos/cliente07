import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarioModel';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})

export class UsuariosListarComponent implements OnInit {
  usuarios: Usuario[];
  id_select: string = "1";
  indice: number = 0;
  nuevo: Usuario = {};
  actual: Usuario = {};

  constructor(private usuariosService: UsuariosService) {
    //this.usuariosService.cargarUsuariosLocal(); //forzamos el uso de la carga local a modo de prueba.
    //this.usuarios = this.usuariosService.listarUsuarios();
    this.usuarios=[];
    console.log("Usuarios listar");
    console.log(this.usuarios);
  }

  actualizar() {
    console.log("Elige: " + this.id_select);
    console.log(this.usuarios);
    this.usuariosService.actualizarUsuario(this.id_select,this.actual).subscribe(
      (res:any)=>{
        console.log(res.text);
        this.ngOnInit();
      }
      
    );
  }

  seleccionaValor($event: any) {
    console.log("Elige: " + this.id_select);
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.id_select == this.usuarios[i].id) {
        this.indice = i;
        break;
      }
    }
    this.usuariosService.buscarUsuario(this.id_select).subscribe(
      (res:any)=>{
        console.log(res);
        //console.log(res.httpErrorResponse.status);
        this.actual = res;
      }
    );
    console.log(this.indice);
  }

  agregar() {
    console.log(this.nuevo);
    this.usuariosService.guardarUsuario(this.nuevo).subscribe(
      (res:any)=>{
        console.log(res);
        //this.usuarios.push(this.nuevo);
        this.ngOnInit();
        console.log(this.usuarios);
        this.nuevo = {};
      });
  }

  eliminar($event: any) {
    console.log($event.target.value);
    let id: string = $event.target.value; //Guardamos el id del boton
    this.usuariosService.eleminarUsuario(id).subscribe(
      (res: any) => {
          this.ngOnInit();
          console.log(this.usuarios);
      }
    );
  }

  ngOnInit(): void {
    this.usuariosService.listarUsuarios().subscribe(
      (res:any) => {
        console.log(res);
        this.usuarios=(res);
        Object.assign(this.actual,this.usuarios[0]);
        console.log(this.usuarios);
      }
    );
  }

}
