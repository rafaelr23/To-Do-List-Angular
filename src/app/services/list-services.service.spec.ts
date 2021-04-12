import { TestBed } from '@angular/core/testing';

import { ListServicesService } from './list-services.service';

describe('ListServicesService', () => {
  let service: ListServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
