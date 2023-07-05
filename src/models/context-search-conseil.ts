import {DefaultSearchConseil} from './default-search-conseil';
import {SelectedCustomerConseil} from './selected-customer-conseil';

export interface ContextSearchConseil {
  defaultSearch: DefaultSearchConseil;
  currentTabIndex: number;
  selectedCustomer: Array<SelectedCustomerConseil>;
}
