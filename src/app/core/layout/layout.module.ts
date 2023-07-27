import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout.component';
import { PrivateComponent } from './private.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    PrivateComponent,
    LogoutComponent,
  ],
  exports: [HeaderComponent, FooterComponent, PrivateComponent],
  providers: [],
})
export class LayoutModule {}
