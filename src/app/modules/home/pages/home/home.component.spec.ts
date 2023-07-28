import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AuthService } from '@core/services';
import { HomeComponent } from './home.component';

describe(`#${HomeComponent.name}`, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [CommonModule, RouterModule],
    })
      .overrideComponent(HomeComponent, {
        set: {
          providers: [{ provide: AuthService, useValue: authService }],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
      });
  });

  it(`#${HomeComponent.name} should create`, () => {
    expect(component).toBeTruthy();
  });
});
