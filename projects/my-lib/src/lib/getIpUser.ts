import { HttpClient } from '@angular/common/http';

export class getAdress {
  constructor(private http: HttpClient) {}
  async getIpUser() {
    const response = await this.http
      .get<{ ip: string }>('https://api.ipify.org?format=json')
      .toPromise();
    if (response) {
      return response.ip;
    } else {
      return 'No encontrada';
    }
  }
}

export async function getIpUserFunction(HttpClient: HttpClient) {
  const getAdresss = new getAdress(HttpClient);
  const ip = await getAdresss.getIpUser();

  return ip;
}
