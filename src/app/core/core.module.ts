import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, LayoutModule],
  exports: [LayoutModule],
  providers: [],
})
export class CoreModule {}
