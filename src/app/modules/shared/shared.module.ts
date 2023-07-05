import { SimplebarAngularModule } from 'simplebar-angular';
import { SelectedCustomerModule } from './selected-customer/selected-customer.module';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { MaterialModule } from './material/material.module';
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedRoutingModule } from "./shared-routing.module";
import {
  TRANSLATION_PROVIDER,
} from "@alfresco/adf-core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { AlertMessageModule } from './alert-message/alert-message.module';

const imports = [
  CommonModule,
  AlertMessageModule,
  SharedRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  PdfViewerModule,
  MaterialModule,
  SharedComponentsModule,
  PipesModule,
  ServicesModule,
  SelectedCustomerModule,
  SimplebarAngularModule
];

@NgModule({
  imports: imports,
  exports: imports,
  providers: [
    {
      provide: TRANSLATION_PROVIDER,
      multi: true,
      useValue: {
        name: 'app',
        source: 'assets',
      },
    }
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
