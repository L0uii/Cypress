import {DefaultSearchGeranceAssocies} from './default-search-gerance-associes';
import {SelectedCustomerGeranceAssocies} from './selected-customer-gerance-associes';

export interface ContextSearchGeranceAssocies {
  defaultSearch: DefaultSearchGeranceAssocies;
  currentTabIndex: number;
  selectedCustomer: Array<SelectedCustomerGeranceAssocies>;
}
