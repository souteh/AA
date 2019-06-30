import { OnInit, Component, ViewChild } from '@angular/core';
import { IAction } from 'src/app/shared/datatable/action/IAction';
import { Field } from 'src/app/core/model/field';
import { ITableConfig } from 'src/app/shared/datatable/table-config';
import { FieldService } from '../field.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { FieldPatch } from 'src/app/core/model/fieldPatch';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { IColumn } from '../../../../shared/datatable/column';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ConfigService } from 'src/app/config.service';



@Component({
    selector: 'app-list-field',
    templateUrl: './lilst-field-conf.component.html',
    styleUrls: ['./lilst-field-conf.component.scss']
})
export class ListFieldComponent implements OnInit {

    columns: IColumn[];
    rows = [];
    currentPage = 1;
    actions: IAction[];
    selectedField: Field;
    config: ITableConfig = {
        showFilterHeader: false
    };

    SelectedField: Field;
    @ViewChild('childModal') childModal: ModalDirective;

    fieldPatch: FieldPatch = {
        isEnabled: false
    };
    defaultLanguage: any;



    constructor(private translate: TranslateService, private fieldService: FieldService
        , private toastr: ToastrService, private router: Router, private breadcrumbsService: BreadcrumbsService,
        private titleService: PageTitle,
        private configService: ConfigService) {

        this.defaultLanguage = this.configService.languages[0];
    }



    ngOnInit() {
        this.titleService.changeMessage('FIELD.LISTING.TITLE');
        this.currentPage = this.fieldService.currentPage;
        setTimeout(x => {
            this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] },
            { label: this.translate.instant('FIELD.LISTING.BREADCRUMB'), url: '/fields', params: [] }]);
        }, 200);
        this.columns =
            [
                { label: 'FIELD.LISTING.NAME', property: 'name', type: 'string', val: '', filter: { type: 'text' } },
                {
                    label: 'FIELD.LISTING.TYPE', property: 'fieldType', type: 'enum', val: 'FIELD.FIELD_TYPE',
                    filter: {
                        type: 'list', values: [
                            { key: 'date', value: 'FIELD.FIELD_TYPE.DATE' },
                            { key: 'number', value: 'FIELD.FIELD_TYPE.NUMBER' },
                            { key: 'password', value: 'FIELD.FIELD_TYPE.PASSWORD' },
                            { key: 'pin_code', value: 'FIELD.FIELD_TYPE.PIN_CODE' },
                            { key: 'select', value: 'FIELD.FIELD_TYPE.SELECT' },
                            { key: 'text', value: 'FIELD.FIELD_TYPE.TEXT' },
                            { key: 'checkbox', value: 'FIELD.FIELD_TYPE.CHECKBOX' },
                        ]
                    }
                },
                { label: 'FIELD.LISTING.MANDATORY', property: 'isMandatory', type: 'boolean', val: '', filter: { type: 'boolean' } },
                { label: 'FIELD.LISTING.VISIBLE', property: 'isVisible', type: 'boolean', val: '', filter: { type: 'boolean' } },
                { label: 'FIELD.LISTING.EXPORTABLE', property: 'isExportable', type: 'boolean', val: '', filter: { type: 'boolean' } },
                {
                    label: 'FIELD.LISTING.STATUS', property: 'isEnabled', type: 'checkbox', val: '', filter: { type: 'checkbox' },
                    disableProp: 'isMain'
                }

            ];


        this.actions = [
            {
                title: 'FIELD.LISTING.ACTION.DISPLAY',
                icon: 'see',
                visible: true,
                actionevent: 'show',
                cssClass: 'icon-info'
            },
            {
                title: 'FIELD.LISTING.ACTION.EDIT',
                icon: 'edit',
                visible: true,
                actionevent: 'edit',
                cssClass: 'icon-success'
            },
            {
                title: 'FIELD.LISTING.ACTION.DELETE',
                icon: 'delete',
                visible: true,
                actionevent: 'delete',
                cssClass: 'icon-danger',
                desabelProp: 'isMain'
            }

        ];

        this.initData();

    }

    initData() {
        this.fieldService.getFields().subscribe(
            data => {
                this.rows = data;
            }
        );
    }

    getAction(value) {
        switch (value.action) {
            case 'show': { this.show(value.data); break; }
            case 'edit': { this.edit(value.data); break; }
            case 'delete': { this.delete(value.data); break; }
            default: { break; }
        }
    }

    onCheck(value) {
        this.fieldPatch.isEnabled = !value.data.isEnabled;
        this.fieldService.updateStatus(value.data.id, this.fieldPatch).subscribe(
            data => {
                this.toastr.success(this.translate.instant('TOASTER.SUCCESS.BODY'), this.translate.instant('TOASTER.SUCCESS.TITLE'));
                this.initData();
            },
            err => this.toastr.error(err.error.message, this.translate.instant('TOASTER.ERROR.TITLE')),
        );
    }

    show(value) {
        this.router.navigate(['/fields', value.id, 'show']);
    }

    edit(value) {
        this.router.navigate(['/fields', value.id, 'edit']);
    }
    delete(value) {
        this.SelectedField = value;
        this.childModal.show();
    }

    deleteField(): void {

        this.fieldService.deleteField(this.SelectedField.id).subscribe(
            data => {
                this.toastr.success(this.translate.instant('TOASTER.DELETE.SUCCESS.BODY'),
                    this.translate.instant('TOASTER.DELETE.SUCCESS.TITLE'));
                this.childModal.hide();
                this.initData();

            },
            err => this.toastr.error(err.error.message, this.translate.instant('TOASTER.DELETE.ERROR.TITLE')),
        );
    }

    hideChildModal(): void {
        this.childModal.hide();
    }
    selectedPage(value) {
        this.fieldService.currentPage = value;
    }

}

