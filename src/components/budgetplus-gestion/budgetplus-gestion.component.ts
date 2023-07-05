import {Component, OnDestroy, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthenticationService, PeopleContentService} from '@alfresco/adf-core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FetchDataService} from '../../services/fetch-data.service';
import {IntranetUser, IntranetUserResponse} from '../../models/intranet-user';
import {UserService} from '../../services/user.service';
import {SnackbarService} from '../../services/snackbar.service';
import { MatSelect } from '@angular/material/select';
import {from, Subscription} from 'rxjs';

@Component({
  selector: 'app-budgetplus-gestion',
  templateUrl: './budgetplus-gestion.component.html',
  styleUrls: ['./budgetplus-gestion.component.scss']
})
export class BudgetplusGestionComponent implements OnDestroy {
  separatorKeyCodes: number[] | ReadonlySet<number> = [ENTER, COMMA];
  form: UntypedFormGroup;
  showResponses = false;
  addOnBlur = true;
  codesBudget: Array<string>;
  user: IntranetUser;
  users: IntranetUser[] = [];
  showUser = false;
  showInput = true;
  showResults = false;
  showError = false;
  @ViewChild('select') select: MatSelect;
  private arraySubscription: Subscription;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private peopleContentService: PeopleContentService,
    private auth: AuthenticationService,
    private searchData: FetchDataService,
    private snack: SnackbarService,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      selectedUser: [''],
    });
  }

  ngOnDestroy() {
    if (this.arraySubscription) {
      this.arraySubscription.unsubscribe();
    }
  }

  selectUser() {
    if (this.form.value.user) {
      this.arraySubscription = this.searchData.getUser({
        searchQuery: 'ldap:employeeNumber:' + this.form.value.user + ' OR cm:userName:*' + this.form.value.user + '*'
      }).subscribe((resp: IntranetUserResponse) => {
        resp.entries.forEach(
          entry => {
            if (!this.users.find(user => user.UserName === entry.UserName)) {
              this.users.push(entry);
            }
          }
        );
        if (this.users.length) {
          this.showResponses = true;
          this.showInput = false;
        } else {
          this.snack.openError('Aucun utilisateur ne correspond à votre recherche.');
        }
      });
    } else {
      this.snack.openError('Veuillez saisir une valeur.');
    }
  }

  destroySelectedCustomer() {
    this.form.patchValue({user: ''});
    this.users = [];
    this.showResponses = false;
    this.showUser = false;
    this.showInput = true;
    this.showResults = false;
  }

  clearCustomer() {
    this.form.patchValue({user: ''});
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      value.length === 5 ? this.codesBudget.push(value)
        : this.snack.openError('Un code budget comprend obligatoirement 5 chiffres. Merci de compléter votre saisie');
    }

    if (event.input.value.length === 5) {
      event.input.value = '';
    }
  }

  remove(codeBudget: string): void {
    const index = this.codesBudget.indexOf(codeBudget);
    if (index >= 0) {
      this.codesBudget.splice(index, 1);
    }
  }

  selectedUser(user: IntranetUser) {
    this.user = user;
    this.codesBudget = this.user.CodeBudgetPlus ? this.user.CodeBudgetPlus.split(',') : [];
    this.showResponses = false;
    this.showUser = true;
  }

  onSubmit() {
    this.user.CodeBudgetPlus = this.codesBudget.join();
    this.userService.editCodeBudgetPlus(this.user).then(resp => {
      if (resp.ok) {
        this.showInput = false;
        this.showUser = false;
        this.showResults = true;
      }
    }).catch(() => {
      this.showError = true;
    });
  }

  changeChoice() {
    this.form.patchValue({user: ''});
    this.users = [];
    this.showResponses = false;
    this.showInput = true;
  }
}
