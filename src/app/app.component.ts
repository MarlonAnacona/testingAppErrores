import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEvents, nameApp, nameKey, nameKeyParent } from 'cuadroDialogo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private routerEvents: RouterEvents) {}

  ngOnInit() {
    nameApp('Aplicación prueba');
    nameKey('TEC');
    nameKeyParent('TEC-19');
    //throw new Error('pruebita login');
  }
  title = 'library';
}
