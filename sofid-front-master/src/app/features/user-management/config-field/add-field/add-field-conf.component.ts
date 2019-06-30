import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FieldType } from 'src/app/core/model/fieldType';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'src/app/core/model/selectItem';
import { ToastrService } from 'ngx-toastr';
import { FieldService } from '../field.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Field } from 'src/app/core/model/field';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ConfigService } from 'src/app/config.service';


@Component({
    selector: 'app-add-field',
    templateUrl: './add-field-conf.component.html',
    styleUrls: ['./add-field-conf.component.scss']
})
export class AddFieldConfigComponent implements OnInit {

    fieldForm: FormGroup;

    fieldEdit: Field;

    isOrdreVisible: Boolean = false;
    isOrdreExportVisible: Boolean = false;

    disableVisibility: Boolean = false;
    disableMandatory: Boolean = false;

    fieldTypes: Array<FieldType>;
    rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    columns: number[] = [1, 2, 3, 4];
    operations: string[] = ['=', '< >', '<', '>', '<=', '>=', 'like', 'in', 'between'];

    showInfoText: Boolean = false;
    showInfoSelect: Boolean = false;

    selectItems: Array<SelectItem>;

    sourceSelectItems: Array<SelectItem>;


    msgKO: string;
    public error: any;
    fieldId: number;

    isDisableField: Boolean = false;
    isMain: Boolean = false;
    defaultLanguage: any;

    constructor(private fb: FormBuilder, private translate: TranslateService, private fieldService: FieldService
        , private toastr: ToastrService, private router: Router, private route: ActivatedRoute
        , private breadcrumbsService: BreadcrumbsService,
        private titleService: PageTitle,
        private config: ConfigService
    ) {
        this.defaultLanguage = this.config.languages[0];


        this.fieldForm = this.fb.group({
            nameField: ['', Validators.required],
            errorMsgField: ['', ''],
            validationRegex: ['', ''],
            fieldType: ['', Validators.required],
            referenceTypeId: ['', ''],
            isMultiple: [false],
            isAutoComplete: [false, Validators.required],
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
            }, { validator: [this.validateVisibility, Validators.required] }),
            mandatoryCondition: this.fb.group({
                fieldId: ['', ''],
                operation: ['', ''],
                value: ['', ''],
            }, { validator: [this.validateMandatory, Validators.required] }),


            displayInList: [false],
            isEditable: [false],
            isExportable: [false],
            isFilterEnabled: [false],

            displayPosition: ['', ''],
            exportPosition: ['', ''],
            isEnabled: [true]
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.fieldId = +params['id'];
        });
        if (this.fieldId === 0) {
            this.titleService.changeMessage('FIELD.ADDITION.TITLE');
        }
        if (this.fieldId !== 0) {
            this.titleService.changeMessage('FIELD.EDITION.TITLE');
        }
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
        if (this.fieldId !== 0) {
            setTimeout(x => {
                this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] },
                {
                    label: this.translate.instant('FIELD.LISTING.BREADCRUMB'), url: '/fields',
                    params: []
                }, { label: this.translate.instant('FIELD.EDITION.BREADCRUMB'), url: '/fields/' + this.fieldId, params: [] }]);
            }, 200);
            this.isDisableField = true;

            this.fieldService.getFieldByID(this.fieldId).subscribe(
                (result) => {
                    this.fieldEdit = result;
                    this.isMain = result.isMain;
                    this.fieldForm.controls['nameField'].patchValue(result.i18nText.translations['fr']);
                    const name = this.fieldForm.controls['i18nText'];
                    name['controls']['translations'].patchValue(result.i18nText.translations);
                    this.fieldForm.controls['fieldType'].patchValue(result.fieldType);
                    this.fieldForm.controls['isVisible'].patchValue(result.isVisible);
                    this.fieldForm.controls['isMandatory'].patchValue(result.isMandatory);
                    this.fieldForm.controls['position'].patchValue(result.position);

                    if (result.mandatoryCondition !== null) {
                        this.fieldForm.controls['mandatoryCondition'].patchValue(result.mandatoryCondition);
                        this.disableMandatory = false;
                    } else {
                        if (result.isMandatory) {
                            this.disableMandatory = true;
                            this.fieldForm.controls['mandatoryCondition'].disable();
                        } else {
                            this.fieldForm.controls['mandatoryCondition'].enable();
                            this.disableMandatory = false;
                        }
                    }

                    if (result.visibilityCondition !== null) {
                        this.fieldForm.controls['visibilityCondition'].patchValue(result.visibilityCondition);
                        this.disableVisibility = false;
                    } else {
                        if (result.isVisible) {
                            this.disableVisibility = true;
                            this.fieldForm.controls['visibilityCondition'].disable();
                        } else {
                            this.fieldForm.controls['visibilityCondition'].enable();
                            this.disableVisibility = false;
                        }
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
                        this.showInfoText = true;
                        setTimeout(x => {
                            this.fieldForm.controls['errorMsgField'].setValidators(Validators.required);
                            this.fieldForm.controls['errorMsgField'].patchValue(this.fieldEdit.regexErrorI18nText.translations['fr']);
                            const ctlTmp = this.fieldForm.controls['regexErrorI18nText'];
                            ctlTmp['controls']['translations'].setValidators(Validators.required);
                            ctlTmp['controls']['translations'].patchValue(result.regexErrorI18nText.translations);
                            this.fieldForm.controls['validationRegex'].setValidators(Validators.required);
                            this.fieldForm.controls['validationRegex'].patchValue(result.validationRegex);
                        }, 100);
                    }

                    if (this.fieldForm.value.fieldType === 'SELECT') {
                        this.showInfoSelect = true;
                        setTimeout(x => {
                            this.fieldForm.controls['referenceTypeId'].patchValue(result.referenceTypeId);
                            this.fieldForm.controls['isMultiple'].patchValue(result.isMultiple);
                            this.fieldForm.controls['isAutoComplete'].patchValue(result.isAutoComplete);

                            this.fieldService.sourceSelectItems().subscribe(
                                data => {
                                    this.sourceSelectItems = data;
                                }
                            );
                        }, 100);
                    }

                });

        } else {
            setTimeout(x => {
                this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] },
                {
                    label: this.translate.instant('FIELD.LISTING.BREADCRUMB'), url: '/fields',
                    params: []
                }, { label: this.translate.instant('FIELD.ADDITION.BREADCRUMB'), url: '/fields/0', params: [] }]);
            }, 200);
            this.isDisableField = false;
            this.fieldForm.controls['visibilityCondition'].enable();
            this.fieldForm.controls['mandatoryCondition'].enable();
        }
    }

    showExpression() {
        this.fieldForm.controls['errorMsgField'].clearValidators();
        this.fieldForm.controls['validationRegex'].updateValueAndValidity();

        this.fieldForm.controls['referenceTypeId'].clearValidators();
        this.fieldForm.controls['referenceTypeId'].updateValueAndValidity();

        this.fieldForm.value.validationRegex = '';
        this.fieldForm.value.regexErrorI18nText = '';

        if (this.fieldForm.value.fieldType === 'SELECT') {
            this.showInfoSelect = true;
            this.fieldService.sourceSelectItems().subscribe(
                data => {
                    this.sourceSelectItems = data;
                }
            );
        } else {
            this.showInfoSelect = false;
        }


        if (this.fieldForm.value.fieldType === 'TEXT' ||
            this.fieldForm.value.fieldType === 'PIN_CODE' || this.fieldForm.value.fieldType === 'PASSWORD') {
            this.showInfoText = true;
            this.fieldForm.controls['errorMsgField'].setValidators(Validators.required);
            this.fieldForm.controls['validationRegex'].setValidators(Validators.required);
        } else {
            this.showInfoText = false;
        }
    }


    checkOrder() {
        this.isOrdreVisible = this.fieldForm.value.displayInList;
        if (this.fieldForm.value.displayInList) {
            this.fieldForm.controls['displayPosition'].setValidators(Validators.required);
        } else {
            this.fieldForm.controls['displayPosition'].clearValidators();
            this.fieldForm.controls['displayPosition'].updateValueAndValidity();
            this.fieldForm.value.displayPosition = '';

        }
    }

    checkExportable() {
        this.isOrdreExportVisible = this.fieldForm.value.isExportable;
        if (this.fieldForm.value.isExportable) {
            this.fieldForm.controls['exportPosition'].setValidators(Validators.required);
        } else {
            this.fieldForm.controls['exportPosition'].clearValidators();
            this.fieldForm.controls['exportPosition'].updateValueAndValidity();
            this.fieldForm.value.exportPosition = '';
        }
    }

    checkMandatory(value) {

        this.fieldForm.controls['isVisible'].setValue(this.fieldForm.controls['isMandatory'].value);

        this.disableMandatory = this.fieldForm.value.isMandatory;
        this.disableVisibility = this.fieldForm.value.isVisible;

        if (this.fieldForm.value.isMandatory && this.fieldForm.value.isVisible) {

            const mandatory = this.fieldForm.controls['mandatoryCondition'];
            mandatory['controls']['fieldId'].setValue(null);
            mandatory['controls']['operation'].setValue(null);
            mandatory['controls']['value'].setValue(null);

            const visibility = this.fieldForm.controls['visibilityCondition'];
            visibility['controls']['fieldId'].setValue(null);
            visibility['controls']['operation'].setValue(null);
            visibility['controls']['value'].setValue(null);

            this.fieldForm.value.mandatoryCondition = null;
            this.fieldForm.controls['mandatoryCondition'].disable();

            this.fieldForm.value.visibilityCondition = null;
            this.fieldForm.controls['visibilityCondition'].disable();
        } else {
            this.fieldForm.controls['mandatoryCondition'].enable();
            this.fieldForm.controls['visibilityCondition'].enable();

        }
    }

    checkVisibility() {

        this.disableVisibility = this.fieldForm.value.isVisible;

        if (this.fieldForm.value.isVisible) {

            const visibility = this.fieldForm.controls['visibilityCondition'];
            visibility['controls']['fieldId'].setValue(null);
            visibility['controls']['operation'].setValue(null);
            visibility['controls']['value'].setValue(null);

            this.fieldForm.value.visibilityCondition = null;
            this.fieldForm.controls['visibilityCondition'].disable();
        } else {
            this.fieldForm.controls['visibilityCondition'].enable();
        }
    }

    createField() {
        if (this.fieldForm.value.isVisible) {
            this.fieldForm.controls['visibilityCondition'].disable();
        }
        if (this.fieldForm.value.isMandatory) {
            this.fieldForm.controls['mandatoryCondition'].disable();
        }

        this.route.params.subscribe(params => {
            this.fieldId = +params['id'];
        });
        if (!this.fieldForm.value.isExportable) {
            this.fieldForm.value.exportPosition = '';
        }

        if (!this.fieldForm.value.displayInList) {
            this.fieldForm.value.displayPosition = '';
        }

        if (this.fieldId !== 0) {
            this.fieldService.updateField(this.fieldForm.value, this.fieldId).subscribe(
                (result) => {
                    if (result) {
                        const title = this.translate.instant('FIELD.EDITION.TITLE_MSG_SUCCES');
                        const bodySuccess = this.translate.instant('FIELD.EDITION.BODY_MSG_SUCCES');
                        this.toastr.success(bodySuccess, title);
                        this.router.navigate(['/fields']);

                    }
                },
                (err: any) => {
                    this.msgKO = err.error.message;
                    const titleMsgKO = this.translate.instant('FIELD.EDITION.TITLE_MSG_ERROR');
                    this.toastr.error(this.msgKO, titleMsgKO);
                }
            );
        } else {
            this.fieldService.saveField(this.fieldForm.value).subscribe(
                (result) => {
                    if (result) {
                        const title = this.translate.instant('FIELD.ADDITION.TITLE_MSG_SUCCES');
                        const bodySuccess = this.translate.instant('FIELD.ADDITION.BODY_MSG_SUCCES');
                        this.toastr.success(bodySuccess, title);
                        this.router.navigate(['/fields']);

                    }
                },
                (err: any) => {
                    this.msgKO = err.error.message;
                    const titleMsgKO = this.translate.instant('FIELD.ADDITION.TITLE_MSG_ERROR');
                    this.toastr.error(this.msgKO, titleMsgKO);
                }
            );
        }
    }

    validateVisibility(control: FormGroup) {
        const isVisibilityConditionEmpty: boolean = ((control.controls['fieldId'].value === undefined
            || control.controls['fieldId'].value === null || control.controls['fieldId'].value === '')
            && (control.controls['operation'].value === undefined || control.controls['operation'].value === null
                || control.controls['operation'].value === '') &&
            (control.controls['value'].value === undefined || control.controls['value'].value === null ||
                (control.controls['value'].value === '')));

        const isVisibilityConditionNotEmpty: boolean = ((control.controls['fieldId'].value !== undefined
            && control.controls['fieldId'].value !== null)
            && (control.controls['operation'].value !== undefined && control.controls['operation'].value !== null) &&
            (control.controls['value'].value !== undefined && control.controls['value'].value !== ''
                && control.controls['value'].value !== null));


        if (isVisibilityConditionEmpty || isVisibilityConditionNotEmpty) {
            return null;
        }
        return { nomatch: true };
    }

    validateMandatory(control: FormGroup) {
        const isMandatoryConditionEmpty: boolean = ((control.controls['fieldId'].value === undefined
            || control.controls['fieldId'].value === null || control.controls['fieldId'].value === '')
            && (control.controls['operation'].value === undefined || control.controls['operation'].value === null
                || control.controls['operation'].value === '') &&
            (control.controls['value'].value === undefined || control.controls['value'].value === null ||
                (control.controls['value'].value === '')));

        const isMandatoryConditionNotEmpty: boolean = ((control.controls['fieldId'].value !== undefined
            && control.controls['fieldId'].value !== null)
            && (control.controls['operation'].value !== undefined && control.controls['operation'].value !== null) &&
            (control.controls['value'].value !== undefined && control.controls['value'].value !== ''
                && control.controls['value'].value !== null));


        if (isMandatoryConditionEmpty || isMandatoryConditionNotEmpty) {
            return null;
        }
        return { nomatch: true };
    }


}
