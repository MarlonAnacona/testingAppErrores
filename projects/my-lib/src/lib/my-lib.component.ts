import {
  Component,
  ErrorHandler,
  ComponentFactoryResolver,
  ViewContainerRef,
  Injectable,
  ViewChild,
  Injector,
  ReflectiveInjector,
  Directive,
  Inject,
} from '@angular/core';
import { errorInfo, metodos } from './interfaz';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHandler,
} from '@angular/common/http';
import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { XhrFactory } from '@angular/common/http';
import { retry } from 'rxjs';
import { getIpUserFunction } from './getIpUser';

// import { showDialog, DialogService, showDialog2, mostrarCuadro } from './ShowDialog';
function tryToUnwrapZonejsError(error: unknown): unknown | Error {
  //trata de desempaquetar un error, verificando si tiene la propiedad de angular ngOriginalError el cual es crea una copía del error antes de ser manipulado

  return error && (error as { ngOriginalError: Error }).ngOriginalError
    ? (error as { ngOriginalError: Error }).ngOriginalError
    : error;
}

function extraerHttpErrro(error: HttpErrorResponse): string | Error {
  if (EsErrorOErrorObjeto(error.error)) {
    return error.error;
  }

  if (error.error instanceof ErrorEvent && error.error.message) {
    return error.error.message;
  }
  if (typeof error.error === 'string') {
    return `Servidor retorno el codigo  ${error.status} con cuerpo "${error.error}"`;
  }

  return error;
}

type ErrorCandidate = {
  name?: unknown;
  message?: unknown;
  stack?: unknown;
};

function EsErrorOErrorObjeto(value: unknown): value is Error {
  if (value instanceof Error) {
    return true;
  }

  if (value === null || typeof value !== 'object') {
    return false;
  }

  const candidate = value as ErrorCandidate;

  return (
    typeof candidate.name === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.message === 'string' &&
    (undefined === candidate.stack || typeof candidate.stack === 'string')
  );
}

class MyXhrFactory implements XhrFactory {
  build(): XMLHttpRequest {
    return new XMLHttpRequest();
  }
}

export async function retornarIp() {
  const xhrFactory = new MyXhrFactory();
  const httpBackend = new HttpXhrBackend(xhrFactory);
  const getIp = getIpUserFunction(new HttpClient(httpBackend));

  return await getIp.then((ip) => {
    return ip;
  });
}

async function crearMensajeObjeto(error: Error, erroresMetodos: metodos[]) {
  erroresMetodos = [];
  let iprecibida = await retornarIp();
  const stack: any = error.stack;
  if (!stack) {
  }

  const lines: string[] = stack.split('\n');

  const methodRegex: any = /at (.*) \((.*):(\d+):(\d+)\)/;

  lines.forEach((line) => {
    const match = line.match(methodRegex);
    if (match) {
      const [, metodo, location, lines] = match;
      erroresMetodos.push({ metodo, location, lines });
    }
  });

  const errorInfo: errorInfo = {
    message: error.toString(),
    component: 'MyLibComponent',
    method: erroresMetodos,
    time: new Date().toLocaleString(),
    navegator: navigator.userAgent,
    ip: iprecibida,
  };

  return errorInfo;

  erroresMetodos = [];
}

export interface ErrorHandlerOptions {
  logErrors?: boolean;
  showDialog?: boolean;

  /**
   * Custom implementation of error extraction from the raw value captured by the Angular.
   * @param error Value captured by Angular's ErrorHandler provider
   * @param defaultExtractor Default implementation that can be used as the fallback in case of custom implementation
   */
  extractor?(
    error: unknown,
    defaultExtractor: (error: unknown) => unknown
  ): unknown;
}

@Injectable()
export class MyLibComponent implements ErrorHandler {
  constructor() {}

  erroresMetodos: metodos[] = [];

  handleError(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      console.log(this._defaultExtractor(error));
    } else if (error instanceof TypeError) {
      console.error('Error de tipo:', error.message);
    } else if (error instanceof ReferenceError) {
      console.error('Error de referencia:', error.message);
    } else {
      crearMensajeObjeto(error, this.erroresMetodos);
      this._defaultExtractor(error);
    }
  }

  protected _defaultExtractor(errorCandidate: unknown): unknown {
    const error = tryToUnwrapZonejsError(errorCandidate);

    if (error instanceof HttpErrorResponse) {
      return extraerHttpErrro(error);
    }

    if (typeof error === 'string' || EsErrorOErrorObjeto(error)) {
      return error;
    }

    // No extrae nada, devuelve el error por defecto
    return null;
  }
}

export function createError(config?: ErrorHandlerOptions): MyLibComponent {
  return new MyLibComponent();
}
