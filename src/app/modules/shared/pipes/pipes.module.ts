import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeyValuePipe} from 'pipes/keyValue.pipe';
import {SigningStatusPipe} from 'pipes/signing-status.pipe';
import {ExpLevelPipe} from 'pipes/exp-level.pipe';
import {TypeDocumentConseilPipe} from 'pipes/type-document-conseil.pipe';
import {PendingSignatairePipe} from 'pipes/pending-signataire.pipe';
import {CategorieFidusignPipe} from 'pipes/categorie-fidusign.pipe';
import {SousCategorieFidusignPipe} from 'pipes/sous-categorie-fidusign.pipe';
import {CategorieConseilPipe} from 'pipes/categorie-conseil.pipe';
import {FormatDatePipe} from 'pipes/format-date.pipe';
import {CategorieMrPipe} from 'pipes/categorie-mr.pipe';
import {SousCategorieMrPipe} from 'pipes/sous-categorie-mr.pipe';
import {ThemeMrPipe} from 'pipes/theme-mr.pipe';
import {VisibilityClientMrPipe} from 'pipes/visibility-client-mr.pipe';
import {CreatorPipe} from 'pipes/creator.pipe';
import {CodeBudgetPipe} from 'pipes/code-budget.pipe';
import {OngletMrPipe} from 'pipes/onglet-mr.pipe';
import {OrigineMRPipe} from 'pipes/origine-mr.pipe';
import {ProrietaireGerancePipe} from 'pipes/prorietaire-gerance.pipe';
import {CategorieGeranceAssociesPipe} from 'pipes/categorie-gerance-associes.pipe';
import {CallbackPipe} from 'pipes/callback.pipe';
import {StrReplacePipe} from 'pipes/str-replace.pipe';
import {FamilleGeranceAssociesPipe} from 'pipes/famille-gerance-associes.pipe';
import {ProduitsGeranceAssociesPipe} from 'pipes/produit-gerance-associes.pipe';
import {FormatFilesizePipe} from 'pipes/format-filesize.pipe';
import {ReconductionPipe} from 'pipes/reconduction.pipe';
import { LabelValuePipe } from 'pipes/label-value.pipe';

const pipes = [
  KeyValuePipe,
  SigningStatusPipe,
  ExpLevelPipe,
  TypeDocumentConseilPipe,
  PendingSignatairePipe,
  CategorieFidusignPipe,
  SousCategorieFidusignPipe,
  CategorieConseilPipe,
  FormatDatePipe,
  CategorieMrPipe,
  SousCategorieMrPipe,
  ThemeMrPipe,
  VisibilityClientMrPipe,
  CreatorPipe,
  CodeBudgetPipe,
  OngletMrPipe,
  OrigineMRPipe,
  ProrietaireGerancePipe,
  CategorieGeranceAssociesPipe,
  FamilleGeranceAssociesPipe,
  CallbackPipe,
  StrReplacePipe,
  ProduitsGeranceAssociesPipe,
  FormatFilesizePipe,
  ReconductionPipe,
  LabelValuePipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class PipesModule {
}
