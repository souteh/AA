import { OnInit, Component, TemplateRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { MassImportService } from './mass-import.service';
import { InfoUserImport } from 'src/app/core/model/info-user-import';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BulkOperationType } from './../../../core/model/bulkOperationType';
import { BulkOperationDetail } from 'src/app/core/model/bulkOperationDetail';
import { IColumn } from 'src/app/shared/datatable/column';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProcessingStatus } from 'src/app/core/model/bulkOperationStatus';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/config.service';


@Component({
    selector: 'app-mass-import',
    templateUrl: './mass-import.component.html',
    styleUrls: ['./mass-import.component.scss']
})
export class MassImportComponent implements OnInit, OnDestroy {

    routerEvent: any;
    file: File = null;
    infoUserImport: InfoUserImport;
    modalRef: BsModalRef;

    id: string;
    operationType: string;

    errorList: Array<BulkOperationDetail>;

    columns: IColumn[];
    rows = [];
    currentPage = 1;
    showError: Boolean = false;

    defaultLanguage: any;
    url: any;




    constructor(
        private translate: TranslateService,
        private modalService: BsModalService,
        private breadcrumbsService: BreadcrumbsService,
        public massImportService: MassImportService,
        private titleService: PageTitle,
        private route: ActivatedRoute,
        private router: Router,
        private ngxService: NgxUiLoaderService,
        private configService: ConfigService) {
        this.defaultLanguage = this.configService.languages[0];


    }

    ngOnInit() {

        this.showError = false;
        this.titleService.changeMessage('IMPORT.TITLE');
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.routerEvent = this.router.events.subscribe(
            data => {

                this.route.params.subscribe(params => {
                    this.id = params['id'];
                });
            },
        );

        if (this.id === 'CREATE') {
            this.titleService.changeMessage('IMPORT.TITLE');
            setTimeout(x => {
                this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] },
                {
                    label: this.translate.instant('IMPORT.TITLE'), url: '/massImports/' + this.id,
                    params: []
                }]);
            }, 200);
        } else if (this.id === 'UPDATE') {
            this.titleService.changeMessage('IMPORT.TITLE_UPDATE');
            setTimeout(x => {
                this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] },
                {
                    label: this.translate.instant('IMPORT.TITLE_UPDATE'), url: '/massImports/' + this.id,
                    params: []
                }]);
            }, 200);
        } else {
            this.titleService.changeMessage('IMPORT.TITLE_DELETE');
            setTimeout(x => {
                this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] },
                {
                    label: this.translate.instant('IMPORT.TITLE_DELETE'), url: '/massImports/' + this.id,
                    params: []
                }]);
            }, 200);
        }
        this.getGlobalInfoUser(this.id);

        this.columns =
            [
                {
                    label: 'Ligne', property: 'line', type: 'string', val: '', filter: { type: 'text' }
                },
                {
                    label: 'Nom colonne', property: 'field', type: 'string', val: '', filter: { type: 'text' }
                },
                {
                    label: 'Cause erreur', property: 'error', type: 'string', val: '', filter: { type: 'text' }
                },
            ];
    }

    downloadTemplateUser() {
        this.massImportService.generateTemplate(this.id);
    }

    getGlobalInfoUser(operationType: string) {
        this.massImportService.getGlobalInfo(operationType).subscribe(
            data => {
                this.infoUserImport = data;
            }
        );
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnDestroy() {
        this.routerEvent.unsubscribe();
    }

    fileChange(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];

        }
    }

    validateImport() {
        this.ngxService.start();

        if (this.id === 'CREATE') {
            this.operationType = BulkOperationType[BulkOperationType.CREATION];
        } else if (this.id === 'UPDATE') {
            this.operationType = BulkOperationType[BulkOperationType.UPDATE];
        } else {
            this.operationType = BulkOperationType[BulkOperationType.SUPPRESSION];
        }

        this.massImportService.uploadFile(this.file, this.operationType).subscribe(
            (data) => {
                if (ProcessingStatus.SUCCESS
                    !== +ProcessingStatus[data.status]) {

                    const source = interval(5000)
                        .pipe(
                            startWith(0),
                            switchMap(() => this.massImportService.checkStatus(data.id))
                        );
                    const subscribe = source.subscribe(
                        (dataCheck) => {
                            if (ProcessingStatus.SUCCESS === +ProcessingStatus[dataCheck.status]) {
                                this.errorList = dataCheck.details;
                                this.rows = this.errorList;
                                this.url = dataCheck.errorFile;
                                this.showError = true;
                                this.ngxService.stop();
                                subscribe.unsubscribe();
                            }
                        },
                        (err) => {
                            this.ngxService.stop();
                        }
                    );


                } else {
                    this.errorList = data.details;
                    this.rows = this.errorList;
                    this.showError = true;
                    this.ngxService.stop();
                }
            },
            (err) => {
                this.ngxService.stop();
            }
        );
    }

    importNewFile() {
        this.showError = false;
        this.file = null;
        this.errorList = [];
        this.rows = [];
    }

    downloadTemplateError() {
        window.open(this.url, '_self');
    }

}
