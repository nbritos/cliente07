import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarioModel';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css']
})
export class UsuariosIngresarComponent implements OnInit {

  nuevo: Usuario = {};
  revelar: boolean = false;//permite mostrar u ocultar formulario y mensaje de error.

  //onstructor inicializa el servicio, el enrutador y los campos necesarios para sesion.
  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.nuevo.nombre = "";
    this.nuevo.password = "";
  }

  limpiarUsuario() {
    this.nuevo.nombre = "";
  }

  limpiarPassword() {
    this.nuevo.password = "";
  }

  validarCampos(): boolean {
    console.log("Validando sesion");
    console.log(this.nuevo);
    this.usuariosService.loginUsuario(this.nuevo).subscribe(
      (res: any) => {
        console.log(res);
        if (res.login == "ok") {
          console.log("Login exitoso => " + res.mensaje);
          this.usuariosService.setToken(res.token);
          this.usuariosService.setUsuarioLoggeado(res.nuevo);
          this.router.navigate(['usuarios/home']);
        }
      }
    );
    this.revelar = true;
    return false;
  }

  reintentar() {
    this.revelar = false;
  }

  ingresar() {
    console.log("Iniciando sesion");
    this.router.navigate(['usuarios/home']);
  }

  ngOnInit(): void {
  }

}
