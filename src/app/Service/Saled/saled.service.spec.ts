import { TestBed } from '@angular/core/testing';

import { SaledService } from './saled.service';

describe('SaledService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaledService = TestBed.get(SaledService);
    expect(service).toBeTruthy();
  });
});
