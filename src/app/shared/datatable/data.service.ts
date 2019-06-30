import { Injectable } from '@angular/core';
import { IState } from './state';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap, filter } from 'rxjs/operators';
import { SortDirection } from './sortable.directive';

interface SearchResult {
  data: any[];
  total: number;
}

function compare(v1, v2) {
  if (typeof v1 === 'string') {
    return v1.toLowerCase() < v2.toLowerCase() ? -1 : v1.toLowerCase() > v2.toLowerCase() ? 1 : 0;
  }
  if (typeof v1 === 'boolean') {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
  if (typeof v1 === 'number') {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
}

function sort(data: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return data;
  } else {
    return [...data].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}
function matches(data: any, term: string) {
  return data.name.toLowerCase().includes(term);
}
function filterFlex(arr, criteria) {
  return arr.filter(function (obj) {
    return Object.keys(criteria).every(function (c) {
      const tmp = '' + obj[c];
      return tmp.toLowerCase().indexOf(criteria[c]) !== -1;
    });
  });
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _data$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  _data: any[];


  private _state: IState = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    filterSearch: {},
  };

  constructor() {
  }

  get data$() { return this._data$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return +this._state.pageSize; }
  get total$() { return this._total$.asObservable(); }
  get searchTerm() { return this._state.searchTerm; }
  get filter() { return this._state.filterSearch; }
  get sortColumn() { return this._state.sortColumn; }
  get sortDirection() { return this._state.sortDirection; }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set filterSearch(filterSearch: any) { this._set({ filterSearch }); }

  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }
  set data(value: any[]) {
    this._data = value;
    if ( value && value.length > 0) {
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._data$.next(result.data);
        this._total$.next(result.total);
      });
      this._search$.next();
    }
  }


  private _set(patch: Partial<IState>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm, filterSearch } = this._state;
    const tmpPageSize = +pageSize;
    let data = sort(this._data, sortColumn, sortDirection);
    data = filterFlex(data, filterSearch);
    let total = 0;
    if (data) {
      total = data.length;
      data = data.slice((page - 1) * tmpPageSize, (page - 1) * tmpPageSize + tmpPageSize);
    }
    return of({ data, total });
  }
}
