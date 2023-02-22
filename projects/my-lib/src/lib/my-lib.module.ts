import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';

import {
  createError,
  MyLibComponent,
  ErrorHandlerOptions,
} from './my-lib.component';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [],
  providers: [],
})
export class MyLibModule {}
