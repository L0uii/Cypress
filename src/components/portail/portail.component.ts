import { CodeBudgetService } from './../../services/code-budget.service';
import { AuthenticationService } from '@alfresco/adf-core';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from 'services/group.service';
import {Title} from '@angular/platform-browser';
import {ContextSearchMrService} from '../../services/context-search-mr.service';
import {ContextSearchConseilService} from '../../services/context-search-conseil.service';
import {ContextSearchGeranceAssociesService} from '../../services/context-search-gerance-associes.service';
import { forkJoin, of } from 'rxjs';
import { GroupsEnums } from 'enums/groups.enums';
import { UserService } from 'services/user.service';
import { SearchDirectionRegionaleService } from 'services/search-direction-regionale.service';
import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.scss']
})
export class PortailComponent implements OnInit {
  noGroup = false;
  isLoading = true;
  espacesGED = [];
  groups: Array<string>;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private title: Title,
    private contextSearchMrService: ContextSearchMrService,
    private contextSearchConseilService: ContextSearchConseilService,
    private contextSearchGeranceAssociesService: ContextSearchGeranceAssociesService,
    private authService: AuthenticationService,
    private userService: UserService,
    private searchDirectionRegionaleService: SearchDirectionRegionaleService,
    private searchExpertiseDossierService: SearchDossierExpertiseService,
    private codeBudgetService: CodeBudgetService
  ) {
    this.groups = this.groupService.rights;
  }

  ngOnInit() {
    this.title.setTitle('Espace GED - Portail');
    this.matchGroup();
    this.contextSearchMrService.updateContext({defaultSearch: null, selectedCustomer: null, currentTabIndex: 0});
    this.contextSearchConseilService.updateContext({defaultSearch: null, selectedCustomer: null, currentTabIndex: 0});
    this.contextSearchGeranceAssociesService.updateContext({defaultSearch: null, selectedCustomer: null, currentTabIndex: 0});
    
    // removing selected dossier from session - expertise-consulting
    sessionStorage.removeItem('GED.selectedCustomer');
  }

  matchGroup() {
    this.isLoading = false;
    this.espacesGED = this.groupService.getEspacesGED();
    if (this.espacesGED.length > 0) {
      this.getListsToBeCached().subscribe();
      if (this.espacesGED.length === 1) {
        this.router.navigate([this.espacesGED[0].route]);
      }
    } else {
      this.noGroup = true;
      setTimeout(() => {
        this.authService.logout()
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
      }, 4000);
    }
  }

  private getListsToBeCached() {
    return forkJoin([
      this.getCustomersObservable(),
      this.searchDirectionRegionaleService.getDRList(),
      this.getCodeBudgetList()
    ]);
  }

  private getCustomersObservable() {
    if (!this.hasExpertisePermission()) {
      return of([]);
    }
    return this.searchExpertiseDossierService.getCustomers(this.userService.selectedCodeBudget);
  }

  private getCodeBudgetList() {
    if (!this.hasExpertisePermission()) {
      return of([]);
    }
    return this.codeBudgetService.getCodeBudgetList();
  }

  private hasExpertisePermission() {
    const groups = this.groupService.rights;
    return groups.length && groups.includes(GroupsEnums.isUserMR);
  }
}
