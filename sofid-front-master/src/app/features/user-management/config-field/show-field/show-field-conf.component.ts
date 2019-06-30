import { OnInit, Component } from '@angular/core';
import { FieldService } from '../field.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Field } from 'src/app/core/model/field';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SelectItem } from 'src/app/core/model/selectItem';
import { FieldType } from 'src/app/core/model/fieldType';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ConfigService } from 'src/app/config.service';



@Component({
    selector: 'app-show-field',
    templateUrl: './show-field-conf.component.html',
    styleUrls: ['./show-field-conf.component.scss']
})
export class ShowFieldComponent implements OnInit {

    fieldId: number;
    fieldForm: FormGroup;
    fieldShow: Field;
    showInfoText: Boolean = false;
    showInfoSelect: Boolean = false;
    rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    columns: number[] = [1, 2, 3, 4];
    operations: string[] = ['=', '< >', '<', '>', '<=', '>=', 'like', 'in', 'between'];

    selectItems: Array<SelectItem>;
    sourceSelectItems: Array<SelectItem>;
    fieldTypes: Array<FieldType>;
    disableInfo: Boolean = true;
    isOrdreVisible: Boolean = false;
    isOrdreExportVisible: Boolean = false;
    defaultLanguage: any;




    constructor(private fb: FormBuilder, private translate: TranslateService, private fieldService: FieldService
        , private toastr: ToastrService, private router: ActivatedRoute, private route: Router
        , private breadcrumbsService: BreadcrumbsService,
        private titleService: PageTitle,
        private config: ConfigService) {

        this.defaultLanguage = this.config.languages[0];
        this.fieldForm = this.fb.group({
            nameField: ['', Validators.required],
            errorMsgField: ['', ''],
            validationRegex: ['', ''],
            fieldType: ['', Validators.required],
            referenceTypeId: ['', ''],
            isMultiple: ['', ''],
            isAutoComplete: ['', ''],
            position: this.fb.group({
                line: ['', Validators.required],
                column: ['', Validators.required],
            }),

            isVisible: [false],
            isMandatory: [false],

            visibilityCondition: this.fb.group({
                fieldId: [null, ''],
                operation: [null, ''],
                value: [null, ''],
            }),
            mandatoryCondition: this.fb.group({
                fieldId: ['', ''],
                operation: ['', ''],
                value: ['', ''],
            }),


            displayInList: [false],
            isEditable: [false],
            isExportable: [false],
            isFilterEnabled: [false],

            displayPosition: ['', ''],
            exportPosition: ['', ''],
            isEnabled: [true]
        });

        this.fieldTypes = [
            { key: '-1', value: '' },
            { key: 'CHECKBOX', value: 'CheckBox' },
            { key: 'DATE', value: 'Date' },
            { key: 'NUMBER', value: 'Numérique' },
            { key: 'PASSWORD', value: 'Mot de passe' },
            { key: 'PIN_CODE', value: 'Code Pin' },
            { key: 'SELECT', value: 'Liste déroulante' },
            { key: 'TEXT', value: 'Texte' },
        ];
        this.fieldService.selectItems().subscribe(
            data => {
                this.selectItems = data;
            }
        );
        this.fieldService.sourceSelectItems().subscribe(
            data => {
                this.sourceSelectItems = data;
            }
        );

    }

    ngOnInit() {
        this.titleService.changeMessage('FIELD.DISPLAY.TITLE');
        this.router.params.subscribe(params => {
            this.fieldId = +params['id'];
        });

        setTimeout(x => {
            this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] },
            {
                label: this.translate.instant('FIELD.LISTING.BREADCRUMB'), url: '/fields',
                params: []
            }, { label: this.translate.instant('FIELD.DISPLAY.BREADCRUMB'), url: '/fields/' + this.fieldId, params: [] }]);
        }, 200);


        this.fieldService.getFieldByID(this.fieldId).subscribe(
            (result) => {
                this.fieldShow = result;
                this.fieldForm.controls['nameField'].patchValue(result.i18nText.translations['fr']);
                const ctlTmp = this.fieldForm.controls['i18nText'];
                ctlTmp['controls']['translations'].patchValue(result.i18nText.translations);
                this.fieldForm.controls['isVisible'].patchValue(result.isVisible);
                this.fieldForm.controls['isMandatory'].patchValue(result.isMandatory);
                this.fieldForm.controls['position'].patchValue(result.position);

                if (result.mandatoryCondition !== null) {
                    this.fieldForm.controls['mandatoryCondition'].patchValue(result.mandatoryCondition);
                }

                if (result.visibilityCondition !== null) {
                    this.fieldForm.controls['visibilityCondition'].patchValue(result.visibilityCondition);

                }

                this.fieldForm.controls['displayInList'].patchValue(result.displayInList);
                this.fieldForm.controls['isEditable'].patchValue(result.isEditable);
                this.fieldForm.controls['isExportable'].patchValue(result.isExportable);
                this.fieldForm.controls['isFilterEnabled'].patchValue(result.isFilterEnabled);

                if (result.displayPosition) {
                    this.fieldForm.controls['displayPosition'].patchValue(result.displayPosition);
                    this.isOrdreVisible = true;
                }
                if (result.exportPosition) {
                    this.fieldForm.controls['exportPosition'].patchValue(result.exportPosition);
                    this.isOrdreExportVisible = true;

                }

                if (result.fieldType === 'TEXT' ||
                    result.fieldType === 'PIN_CODE' || result.fieldType === 'PASSWORD') {
                    this.fieldForm.controls['errorMsgField'].patchValue(this.fieldShow.regexErrorI18nText.translations['fr']);
                    const controlTmp = this.fieldForm.controls['i18nText'];
                    controlTmp['controls']['translations'].patchValue(result.regexErrorI18nText.translations);
                    this.fieldForm.controls['validationRegex'].patchValue(result.validationRegex);
                    this.showInfoText = true;
                }
                if (result.fieldType === 'SELECT') {
                    this.fieldForm.controls['referenceTypeId'].patchValue(result.referenceTypeId);
                    this.fieldForm.controls['isMultiple'].patchValue(result.isMultiple);
                    this.fieldForm.controls['isAutoComplete'].patchValue(result.isAutoComplete);
                    this.showInfoSelect = true;

                }
                this.fieldForm.controls['fieldType'].patchValue(result.fieldType);

            });



    }

    editField() {
        this.route.navigate(['/fields', this.fieldId, 'edit']);

    }

}
