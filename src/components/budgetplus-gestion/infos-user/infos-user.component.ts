import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IntranetUser} from '../../../models/intranet-user';

@Component({
  selector: 'app-infos-user',
  templateUrl: './infos-user.component.html',
  styleUrls: ['./infos-user.component.scss']
})
export class InfosUserComponent implements OnInit {
  @Input() user: IntranetUser;
  @Output() detroySelectedCustomer: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  emitDestroySelectedCustomer() {
    this.detroySelectedCustomer.emit();
  }
}
