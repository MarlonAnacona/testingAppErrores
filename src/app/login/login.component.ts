import { UsuariosServicesService } from './../servicio.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { crearCuadroError, CuadroDialogoModule } from 'cuadroDialogo';
import { MatDialog } from '@angular/material/dialog';
import { saveError } from 'event-logs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  numero1: number = 0;
  numero2: number = 0;
  constructor(
    private UsuariosServicesServicee: UsuariosServicesService,
    private matDialog: MatDialog,
    private ngzone: NgZone
  ) {}

  ngOnInit(): void {}

  generarerror() {
    this.UsuariosServicesServicee.getUsuarioBD().subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  sumar(): number {
    return 10 / 0;
  }
  generarerrorObject() {
    this.trazabilidad('asdsa');
  }

  trazabilidad(err: unknown) {
    this.trazabilidad2(err);
  }

  trazabilidad2(err: any) {
    throw new Error(err);
  }

  lanzarerror() {
    throw new TypeError('asd');
  }
}
