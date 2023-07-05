import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { GroupService } from "services/group.service";
import { GroupsEnums } from "../enums/groups.enums";

@Injectable({
  providedIn: 'root'
})
export class AuthGroupGuard implements CanActivate {
  constructor(private groupService: GroupService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkGroup(next.data.groups);
  }

  canActivateChild(next: ActivatedRouteSnapshot) {
    return this.checkGroup(next.data.groups);
  }

  private checkGroup(routeGroups: GroupsEnums[]): boolean {
    const userGroups = this.groupService.rights;

    if (routeGroups?.some((rg) => userGroups.some(ug => ug.includes(rg)))) {
      return true;
    }

    this.router.navigate(['/espace-ged/portail']);
    return false;
  }
}
