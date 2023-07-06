import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  logged: number = 0;
  esAdmin: boolean = false;

  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.logged=this.usuariosService.isLoggedIn()?1:0;
    this.esAdmin=this.usuariosService.userAdmin();
  }

  logout() {
    /*Es de notar que el metodo logOut podria haberse hecho en un componente y mantener la sintaxis usuarios/salir pero nos vamos a ahorrar ese paso*/
    this.usuariosService.logOut();
    console.log("Cerrando sesion!!!");
    this.router.navigate(['usuarios/principal']);
  }

  ngOnInit(): void {
    this.esAdmin = this.usuariosService.getEsAdmin();
  }


}
