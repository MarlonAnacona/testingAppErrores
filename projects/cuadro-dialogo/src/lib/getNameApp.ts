let name: string = '';
let methodComponent: any;
let err: any;

export function nameApp(nameApp: string) {
  name = nameApp;
}

export function getnameApp() {
  return name;
}

export function nameMethod(method?: string) {
  methodComponent = method;
}

export function getnameMethod() {
  return methodComponent;
}

export function errorName(method?: Error) {
  err = method;
}

export function getError() {
  return err;
}
