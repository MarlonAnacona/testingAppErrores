import { TestBed } from '@angular/core/testing';

import { UsuariosServicesService } from './servicio.service';

describe('ServicioService', () => {
  let service: UsuariosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
