import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-admin',
  template: `
    <app-header></app-header>
    <!-- main-area -->
    <main class="container-fluid min-vh-100">
      <div class="py-2">
        <router-outlet> </router-outlet>
      </div>
    </main>
    <!-- main-area-end -->
    <app-footer></app-footer>
  `,
})
export class PrivateComponent {
  constructor(private config: NgSelectConfig) {
    this.config.clearAllText = 'Limpiar selección';
    this.config.notFoundText = 'No hay coincidencias';
    this.config.typeToSearchText = 'Escribe para buscar';
    this.config.loadingText = 'Cargando...';
  }
}
