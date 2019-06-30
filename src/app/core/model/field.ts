import { FieldVisibility } from './fieldVisibilityCondition';
import { FieldMandatory } from './fieldMandatoryCondition';
import { PositionField } from './position';
import { I18nText } from './i18nText';
import { FieldType } from './fieldType';

export interface Field {

    id: number;
    i18nText: I18nText;
    regexErrorI18nText: I18nText;
    validationRegex: string;
    position?: PositionField;
    isVisible: boolean;
    visibilityCondition?: FieldVisibility;
    isMandatory: boolean;
    mandatoryCondition?: FieldMandatory;
    isEditable: boolean;
    isExportable: boolean;
    exportPosition: number;
    displayInList: boolean;
    displayPosition: number;
    isFilterEnabled: boolean;
    isEnabled: boolean;
    fieldType: string;
    isMain: boolean;
    referenceTypeId: number;
    isAutoComplete: boolean;
    isMultiple: boolean;







}
