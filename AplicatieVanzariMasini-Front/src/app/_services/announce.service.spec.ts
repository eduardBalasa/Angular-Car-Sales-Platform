/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnnounceService } from './announce.service';

describe('Service: Announce', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnounceService]
    });
  });

  it('should ...', inject([AnnounceService], (service: AnnounceService) => {
    expect(service).toBeTruthy();
  }));
});
