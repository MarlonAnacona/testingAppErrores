interface errorInfo {
  message: string;
  component: string;
  method: metodos[];
  time: string;
  navegator: string;
  ip: string | undefined;
}

//Almacena los metodos que se ejecutaron previos al error
interface metodos {
  metodo: string | undefined;
  location: string | undefined;
  lines: string | undefined;
}

export { errorInfo, metodos };
