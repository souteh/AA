import { SortDirection } from './sortable.directive';

export interface IState {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    filterSearch: any;
}
