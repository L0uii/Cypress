import {Component, OnInit} from '@angular/core';
import {SupervisionService} from 'services/supervision.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-supervision',
  templateUrl: './supervision.component.html',
  styleUrls: ['./supervision.component.scss']
})
export class SupervisionComponent implements OnInit {
  status: boolean;
  // TODO faire deux interfaces
  gfaStatus = {
    ok: false
  } as any;
  fidushareStatus = {
    ok: false
  } as any;
  gfaUrl = environment.alfrescoAPI;
  fiduShareUrl = environment.fidushareAPI;

  constructor(private supervision: SupervisionService) {
  }

  ngOnInit() {
    this.supervision.testGFA().then(status => {
      this.gfaStatus = status;
    });

    this.supervision.testFiduShare().then(status => {
      this.fidushareStatus = status;
    });

    this.supervision.testAll().then(status => {
      this.status = status;
    });
  }
}
