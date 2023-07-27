import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from '../logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(private modalService: NgbModal) {}
  onLogout() {
    this.modalService.open(LogoutComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      scrollable: true,
      size: 'md',
      modalDialogClass: 'payment-plan-modal',
    });
  }
}
