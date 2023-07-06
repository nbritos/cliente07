import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from "src/app/models/usuarioModel";
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  titulo: String = "Vista formulario";

  usuarios: Usuario[];

  revelar: boolean = false;
  seleccionMult: any[] = [];

  constructor(private usuariosService: UsuariosService,
    private router:Router) {
    //this.usuarios = usuariosService.listarUsuarios();
    this.usuarios = [];
    console.log(this.titulo);
    console.log(this.usuarios)
  }

  procesar(): void {
    console.log("Uso de procesar");
    console.log("Capturando el formulario");

    let listaUsuarios:Usuario[]=[];
    console.log("Uso de procesar");
    console.log("Capturando el formulario");

    //Por cada elemento de la seleccion buscamos uno a uno en el array de usuarios
    this.seleccionMult.forEach(valorArray => {
      for(let i=0;i<this.usuarios.length;i++){
        //si econtramos el id, ponemos el registro usuario en listaUsuarios y pasamos al siguiente id
        if(valorArray==this.usuarios[i].id){
          listaUsuarios.push(this.usuarios[i]);
          break;
        }
      }
    });
	//Corroboramos que se guardo en lista.	
    console.log(listaUsuarios);

    this.usuariosService.guardarUsuarios(listaUsuarios);
    this.usuariosService.guardarUsuariosLocal();
    this.router.navigate(['usuarios/listar']);
  }

  addRemoveItem($event: any): void {
    console.log("Capturando el checkbox");
    //Si checked es verdadero agregamos un item al array seleccionMult. Sino, remover 
    if ($event.target.checked) {
      //push agrega un nuevo elemento al array
      this.seleccionMult.push($event.target.value);
    }
    else {
      //splice quita elementos del array. Recibe splice(inicio, cuantos)
      //indexOf devuelve la posicion en el array del valor pasado por parametro
      this.seleccionMult.splice(this.seleccionMult.indexOf($event.target.value), 1);
    }
    //el metodo sort mantiene el orden del array. Es conveniente porque las acciones del usuario no lo son
    this.seleccionMult.sort();
    console.log(this.seleccionMult);
  }

  ngOnInit(): void {
    this.usuariosService.listarUsuarios().subscribe(
      (res:any) => {
        console.log(res);
        this.usuarios=(res);
        console.log(this.usuarios);
      }
    );
  }

}
