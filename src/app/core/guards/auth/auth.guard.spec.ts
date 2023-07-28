import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { lastValueFrom, of } from 'rxjs';
import { AuthGuard } from './auth.guard';

describe('Domain Guard', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  mockRouter.navigate.and.returnValue(lastValueFrom(of(true)));

  const setup = (service: AuthService) => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: service },
        { provide: Router, useValue: mockRouter },
      ],
    });

    return TestBed.runInInjectionContext(AuthGuard);
  };

  it('should allow to continue', async () => {
    const mockDomainService: any = {
      isAuthenticate: async () => true,
    };
    const guard = setup(mockDomainService);
    const result = await guard;
    expect(result).toBe(true);
  });

  it('should redirect to /no-available path', async () => {
    const mockDomainService: any = {
      isAuthenticate: async () => false,
    };

    const guard = setup(mockDomainService);
    const result = await guard;
    expect(result).toBe(true);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
