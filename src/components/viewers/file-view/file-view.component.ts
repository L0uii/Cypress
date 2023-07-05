import { switchMap, tap, catchError } from 'rxjs/operators';
import { NodesApiService } from '@alfresco/adf-core';
/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { Observable, of, EMPTY } from 'rxjs';

@Component({
  selector: 'app-file-view',
  templateUrl: 'file-view.component.html',
  styleUrls: ['file-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileViewComponent implements OnInit {

  nodeId: string = null;
  displayName: string;
  previousTitle: string;

  idList: string[];
  allowNavigate: boolean;
  canNavigateBefore: boolean;
  canNavigateNext: boolean;

  private selectedFileIndex: number;

  nodesData = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private nodesApi: NodesApiService) {
  }

  ngOnInit() {
    this.route.params
    .pipe(
      switchMap(params => {
        this.idList = params.nodeId.split(',');

        this.allowNavigate = this.idList.length > 1;
        if (this.idList.length === 0) {
          return EMPTY;
        }

        return this.navigationHandler(0);
      })
    )
    .subscribe();
  }

  onShowViewerChange(event) {
    if (!event) {
      this.title.setTitle(this.previousTitle);
      this.router.navigate([{ outlets: { view: null } }]);
    }
  }

  onNavigateBefore() {
    this.navigationHandler(this.selectedFileIndex - 1).subscribe();
  }

  onNavigateNext() {
    this.navigationHandler(this.selectedFileIndex + 1).subscribe();
  }

  private navigationHandler(newIndex: number): Observable<any> {
    this.selectedFileIndex = newIndex;

    if (this.allowNavigate) {
      this.canNavigateBefore = newIndex > 0;
      this.canNavigateNext = newIndex < this.idList.length - 1;
    }
    return this.loadFile(this.idList[this.selectedFileIndex]);
  }

  private loadFile(id: string): Observable<any> {
    if (this.nodesData[id]) {
      const { displayName, isFile } = this.nodesData[id];

      this.updateTitle(displayName);
      if (isFile) {
        this.nodeId = id;
        return EMPTY;
      }
      this.router.navigate(['/files', id]);
      return EMPTY;
    }

    return this.nodesApi.getNode(id)
      .pipe(
        tap((node) => {
          if (node) {
            const displayName = node.properties['fp:nommage'];
            const isFile = node.isFile;
            this.nodesData[id] = {
              displayName,
              isFile
            };

            this.updateTitle(displayName);
            if (isFile) {
              this.nodeId = id;
              return;
            }
            this.router.navigate(['/files', id]);
          }
        }),
        catchError(err => this.router.navigate(['/files', id]))
      );
  }

  private updateTitle(displayName: any) {
    this.displayName = displayName;
    this.previousTitle = this.title.getTitle();
    this.title.setTitle(this.displayName);
  }
}
