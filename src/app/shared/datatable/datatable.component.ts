import {
  Component, OnInit, Input, QueryList,
  ViewChild, ElementRef,
  ViewChildren, Output,
  EventEmitter, DoCheck, IterableDiffers
} from '@angular/core';
import { IColumn } from './column';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { SortableDirective, SortEvent } from './sortable.directive';
import { IAction } from '../datatable/action/IAction';
import { ITableConfig } from './table-config';
import { ConfigService } from 'src/app/config.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, DoCheck {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  currentPage = 1;
  sortDirection = '';
  sortColumn = '';
  filter: any = {};
  public configScroll: PerfectScrollbarConfigInterface = {};
  private _data: any[];
  public get data(): any[] {
    return this._data;
  }
  @Input()
  public set data(value: any[]) {
    this.dataService.data = value;
    this._data = value;
  }
  @Input()
  selectePage: number;
  @Input()
  config: ITableConfig = {
    serverSide: false,
    custumWidth: '',
    actionWidth: '10%'
  };
  @Input()
  columns: IColumn[];
  @Input()
  actions: IAction[];
  @Output()
  SelectedAction = new EventEmitter();
  @Output()
  selectedPage = new EventEmitter();
  @Output()
  actionCheck = new EventEmitter();
  @Output()
  advancedResearch = new EventEmitter();

  data$: Observable<any[]>;
  total$: Observable<number>;
  differ: any;
  switchSearchIcon = true;
  defaultLanguage: any;


  constructor(
    differs: IterableDiffers, public dataService: DataService,
    private configLanguage: ConfigService) {
    this.differ = differs.find([]).create(null);
    this.defaultLanguage = this.configLanguage.languages[0];


  }


  ngOnInit() {
    this.data$ = this.dataService.data$;
    this.total$ = this.dataService.total$;
    this.currentPage = this.selectePage;
    this.filter = this.dataService.filter;
  }

  ngDoCheck() {

    const change = this.differ.diff(this.data);
    if (change) {
      this.dataService.data = [...this.data];
      this._data = [...this.data];
    }

  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.sortDirection = direction;
    this.sortColumn = column;
    this.dataService.sortColumn = column;
    this.dataService.sortDirection = direction;
  }

  setPages(value) {
    this.dataService.page = value;
    this.currentPage = value;
    this.selectedPage.emit(value);
  }
  updateFilter(event, prop) {
    this.filter[prop] = event.target.value.toLowerCase();
    this.dataService.filterSearch = this.filter;
  }
  onClickAction(value, row) {
    const ActionRow = { action: value, data: row };
    this.SelectedAction.emit(ActionRow);
  }

  onCheck(value, row, property) {
    const checkRow = { action: value, data: row, property: property };
    this.actionCheck.emit(checkRow);
  }
  getColumnWidth(): string {
    return 90 / (this.columns.length) + '%';
  }
  expand() {
    this.switchSearchIcon = !this.switchSearchIcon;
  }
  hide() {
    this.switchSearchIcon = true;
  }
  advanceSearch() {
    this.switchSearchIcon = true;
    this.advancedResearch.emit();
  }
}
