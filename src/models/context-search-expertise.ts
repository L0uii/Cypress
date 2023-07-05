import {FilePropertiesExpertise} from './file-properties-expertise';
import {DefaultSearchExpertise} from './default-search-expertise';


export interface ContextSearchExpertise {
  defaultSearch: DefaultSearchExpertise;
  currentTabIndex: number;
  collecteMessage: string;
  selectedCustomer: Array<FilePropertiesExpertise>;
}
