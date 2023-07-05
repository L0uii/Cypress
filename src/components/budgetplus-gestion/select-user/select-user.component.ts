import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IntranetUser} from '../../../models/intranet-user';
import { MatSelect } from '@angular/material/select';
import {SnackbarService} from '../../../services/snackbar.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit, AfterViewInit {
  showResponses = false;
  showInput = true;
  @ViewChild('select', { static: true }) select: MatSelect;
  @Input() users: Array<IntranetUser>;
  @Output() selectedUserEvent = new EventEmitter();
  @Output() changeChoiceEvent = new EventEmitter();

  constructor(private snack: SnackbarService,
              private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (this.users.length) {
      this.showResponses = true;
      this.showInput = false;
    } else {
      this.snack.openError('Aucun utilisateur ne correspond à votre recherche.');
    }
  }

  ngAfterViewInit() {
    this.select.open();
    this.cdr.detectChanges();
  }

  selectedUser(user: IntranetUser) {
    this.selectedUserEvent.emit(user);
  }

  changeChoice() {
    this.changeChoiceEvent.emit();
  }
}
