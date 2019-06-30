import { OnInit, Component, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { ExportUserService } from './export-user.service';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ConfigService } from 'src/app/config.service';
import { HistoryExport } from 'src/app/core/model/historyExport';
import { OWL_DATE_TIME_LOCALE, DateTimeAdapter } from 'ng-pick-datetime';
import { NativeDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/native-date-time-adapter.class';
import { Platform } from '@angular/cdk/platform';
import { IColumn } from 'src/app/shared/datatable/column';
import { IAction } from 'src/app/shared/datatable/action/IAction';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-export-user',
    templateUrl: './export-user.component.html',
    styleUrls: ['./export-user.component.scss'],
    providers: [
        { provide: OWL_DATE_TIME_LOCALE, useValue: 'fr' },
        { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE, Platform] },
    ],
})
export class ExportUserComponent implements OnInit {

    defaultLanguage: any;
    public startDate: Date;
    public endDate: Date;

    historiesExports: Array<HistoryExport>;

    columns: IColumn[];
    rows = [];
    currentPage = 1;
    pageSize = 2;
    actions: IAction[];

    @ViewChild('statusTmp')
    statusTmp: TemplateRef<any>;

    @ViewChild('documentTypeTmp')
    documentTypeTmp: TemplateRef<any>;

    typeExport: string;


    constructor(
        private translate: TranslateService,
        private breadcrumbsService: BreadcrumbsService,
        public exportUserService: ExportUserService,
        private titleService: PageTitle,
        private configService: ConfigService,
        private route: ActivatedRoute) {
        this.defaultLanguage = this.configService.languages[0];
    }

    ngOnInit() {

        this.titleService.changeMessage('EXPORT_USER.TITLE');
        setTimeout(x => {
            this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] },
            {
                label: this.translate.instant('EXPORT_USER.TITLE'), url: '/exportUser',
                params: []
            }]);
        }, 200);

        this.route.params.subscribe(params => {
            this.typeExport = params['type'];
        });

        this.columns =
            [
                { label: 'EXPORT_USER.GENERATED_DATE', property: 'generatedDate', type: 'date', val: '' },
                { label: 'EXPORT_USER.END_GEN_DATE', property: 'endDate', type: 'date', val: '' },
                { label: 'EXPORT_USER.EXECUTED_BY', property: 'executedBy', type: 'string', val: '' },
                { label: 'EXPORT_USER.NEMBER', property: 'number', type: 'number', val: '' },
                { label: 'EXPORT_USER.TIME', property: 'processingTime', type: 'date', val: '' },
                { label: 'EXPORT_USER.EXPORT_STATUS', property: 'exportStatus', type: 'template', val: '', cellTemplate: this.statusTmp },
                { label: 'EXPORT_USER.DOWNLOAD', property: 'documentType', type: 'template', val: '', cellTemplate: this.documentTypeTmp }

            ];
    }

    searchHistoryExport() {

        const searchCretaria = {
            offset: (this.currentPage - 1) * this.pageSize,
            size: this.pageSize,
         //   generatedDate: this.startDate,
          //  endDate: this.endDate
        };

        this.exportUserService.getHistory(searchCretaria).subscribe(
            data => {
                this.rows = data;
            }
        );
    }

    downloadDocument(row) {

    }

    selectedPage(value) {
        this.exportUserService.currentPage = value;
    }

}
