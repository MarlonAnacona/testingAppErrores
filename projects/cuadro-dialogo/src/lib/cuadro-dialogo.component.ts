import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, Inject, Injectable, OnInit, NgZone } from '@angular/core';
import { AplicacionErrorDto, Issue, TrazabilidadCodigoDto } from './interfaces';
import { ServicehttpAPIError } from './httpservice';
import { HttpClient, HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { DatePipe, Time, XhrFactory } from '@angular/common';
import { getnameApp, getnameKey, getnameParent } from './getNameApp';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './cuadro-dialogo.component.html',
  styleUrls: ['./cuadro-dialogo.component.css'],
})
/**

Represents an alert dialog that can be used to display an error message and perform actions to report or close the dialog.
*/
export class AlertDialog {
  //In case the message is not found.
  message: string = 'An unspecified error has occurred';
  //Icon show
  icon: string = '';
  //Text default
  buttonText = 'Ok';
  nombre = '';
  descripcion = '';

  //ticketJira
  ticket: string = '';
  idBackend: number = -1;
  showDialog: boolean = false;
  errorDialog: boolean = false;
  public resp: any;

  /**

Creates a new instance of AlertDialog.
@param data The data to initialize the dialog. Includes a message, an optional icon, text for the button, tracking information, user IP address, message object, time when the error occurred, browser used, and user events.
@param dialogRef A reference to the dialog that is being displayed.
*/
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      message: string;
      icon: string;
      buttonText: string;
      idBackend: number;
    },
    private dialogRef: MatDialogRef<AlertDialog>
  ) {
    if (data?.icon) this.icon = data.icon;
    if (data?.message) this.message = data.message;
    if (data?.buttonText) this.buttonText = data.buttonText;

    if (data?.idBackend) this.idBackend = data.idBackend;
  }
  //Method that is executed to close the dialog and send the error information to the backend.
  async enviar() {
    let issue: any;
    let descriptionSend: string = `${this.nombre} \n${
      this.descripcion
    } \nError presentado en la aplicación: ${getnameApp()} \nIdentificado con código: ${
      this.idBackend
    }`;
    issue = {
      summary: 'Error presentado',
      description: descriptionSend,
      projectname: getnameKey(),
      parent: getnameParent(),
    };
    sendJira(issue).subscribe(
      (data) => {
        this.ticket = data.key;
        this.resp = this.idBackend;
        this.showDialog = true;
      },
      (error) => {
        this.errorDialog = true;
      }
    );
    //Evaluates if the error comes from the backend with status 409.
  }

  cerrar() {
    this.dialogRef.close();
  }
}

/**

Class that implements the XhrFactory interface to provide a custom factory for Angular's HttpClient.
*/
class MyXhrFactory implements XhrFactory {
  /**

Creates and returns a new instance of XMLHttpRequest.
@returns A new instance of XMLHttpRequest.
*/
  build(): XMLHttpRequest {
    return new XMLHttpRequest();
  }
}

/**

Sends an API request to save application errors and user events on the frontend.
@param applicationError - Object containing information about the application error.
@param traceabilityCode - Traceability code for tracking the error.
@param userEvents - Object containing information about user events.
@returns An Observable that emits an API response.
*/
export function sendAPIFront(
  aplicacionError: AplicacionErrorDto,
  trazabilidad_codigo: TrazabilidadCodigoDto,
  eventosUsuario: any
) {
  const xhrFactory = new MyXhrFactory();
  const httpBackend = new HttpXhrBackend(xhrFactory);
  const serviceApi = new ServicehttpAPIError(new HttpClient(httpBackend));
  return serviceApi.persistAplicacionErrorFrontEnd(
    aplicacionError,
    trazabilidad_codigo,
    eventosUsuario
  );
}

function sendJira(issue: Issue) {
  const xhrFactory = new MyXhrFactory();
  const httpBackend = new HttpXhrBackend(xhrFactory);
  const serviceApi = new ServicehttpAPIError(new HttpClient(httpBackend));
  return serviceApi.saveApiJira(issue);
}

/**

Class that implements the XhrFactory interface to provide a custom factory for Angular's HttpClient.
*/
class MyXhrFactory1 implements XhrFactory {
  /**

Creates and returns a new instance of XMLHttpRequest.
@returns A new instance of XMLHttpRequest.
*/
  build(): XMLHttpRequest {
    return new XMLHttpRequest();
  }
}

/**

Sends an API request to save user events on the backend.
@param applicationErrorId - ID of the application error.
@param applicationError - Object containing information about the application error.
@param traceabilityCode - Traceability code for tracking the error.
@param userEvents - Object containing information about user events.
@returns An Observable that emits an API response.
*/
export function sendAPIBackend(
  idaplicacionError: number,
  aplicacionError: AplicacionErrorDto,
  trazabilidad_codigo: TrazabilidadCodigoDto,
  eventosUsuario: any
) {
  const xhrFactory = new MyXhrFactory1();
  const httpBackend = new HttpXhrBackend(xhrFactory);
  const serviceApi = new ServicehttpAPIError(new HttpClient(httpBackend));
  return serviceApi.saveTrazabilitiyandUserevents(
    idaplicacionError,
    aplicacionError,
    trazabilidad_codigo,
    eventosUsuario
  );
}
