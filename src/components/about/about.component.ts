import { ContextService } from 'services/context.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isProduction: boolean;
  currentVersion: string;
  releaseNotesUrl: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contextService: ContextService
  ) {
    this.currentVersion = data.currentVersion;
    this.releaseNotesUrl = data.releaseNotesUrl;
  }

  ngOnInit() {
    this.isProduction = environment.production;
  }

  onChangelogClick() {
    this.contextService.saveCurrentVersion();
  }
}
