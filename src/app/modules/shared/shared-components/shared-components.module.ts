import { MonthPickerComponent } from './month-picker/month-picker.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import {RaisedButtonComponent} from './raised-button/raised-button.component';
import {NavReturnButtonComponent} from './nav-return-button/nav-return-button.component';
import {LoadingOverlayComponent} from './loading-overlay/loading-overlay.component';
import {RadioGroupComponent} from './radio-group/radio-group.component';
import {ClearButtonComponent} from './close-button/clear-button.component';
import {YearRangeComponent} from './year-range/year-range.component';
import {TextFieldComponent} from './text-field/text-field.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';
import {DateSelectComponent} from './date-select/date-select.component';
import {EmailListChipsComponent} from './email-list-chips/email-list-chips.component';
import {UploadComponent} from './upload/upload.component';
import {
  RecentlyModifiedIconComponent
} from './../../../../components/base-search-tab/recently-modified-icon/recently-modified-icon.component';
import {SendMailButtonComponent} from 'components/base-search-tab/send-mail-button/send-mail-button.component';
import {SendMailDialogComponent} from 'components/base-search-tab/send-mail-dialog/send-mail-dialog.component';
import {PipesModule} from '../pipes/pipes.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppLayoutComponent} from 'components/app-layout/app-layout.component';
import {BaseSearchTabComponent} from 'components/base-search-tab/base-search-tab.component';
import {DragAndDropDirective} from 'directives/drag-and-drop.directive';
import {FileInputComponent} from 'components/shared/file-input/file-input.component';
import {SendComponent} from 'components/shared/send/send.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {SharedRoutingModule} from '../shared-routing.module';
import {AutocompleteChipsComponent} from './autocomplete-chips/autocomplete-chips.component';
import {MessageComponent} from '../../../../components/message/message.component';

const declarations = [
  DragAndDropDirective,
  AppLayoutComponent,
  BaseSearchTabComponent,
  AutocompleteChipsComponent,
  EmailListChipsComponent,
  UploadComponent,
  FileInputComponent,
  SendComponent,
  SendMailDialogComponent,
  RecentlyModifiedIconComponent,
  SendMailButtonComponent,
  DateSelectComponent,
  AutocompleteComponent,
  DropdownComponent,
  TextFieldComponent,
  YearRangeComponent,
  ClearButtonComponent,
  RadioGroupComponent,
  LoadingOverlayComponent,
  NavReturnButtonComponent,
  MessageComponent,
  RaisedButtonComponent,
  SlideToggleComponent,
  MonthPickerComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  declarations: declarations,
  exports: declarations
})
export class SharedComponentsModule {
}
