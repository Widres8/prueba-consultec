import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logout',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Cerrar Sesión</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activaModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body text-center">
      <h5>¿Esta seguro de cerrar la sesión?</h5>
    </div>
    <div class="modal-footer">
      <div class="d-flex flex-row justify-content-center gap-3">
        <button class="btn btn-light" type="button" (click)="onCloseModal()">
          No
        </button>
        <button
          class="btn btn-primary"
          type="button"
          (click)="onCloseSession()"
        >
          Sí
        </button>
      </div>
    </div>
  `,
})
export class LogoutComponent {
  constructor(
    protected activaModal: NgbActiveModal,
    private authService: AuthService,
    private route: Router
  ) {}

  onCloseModal() {
    this.activaModal.close(false);
  }

  onCloseSession() {
    this.activaModal.close(true);
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
