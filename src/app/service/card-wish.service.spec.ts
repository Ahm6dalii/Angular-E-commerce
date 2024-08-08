import { TestBed } from '@angular/core/testing';

import { CardWishService } from './card-wish.service';

describe('CardWishService', () => {
  let service: CardWishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardWishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
