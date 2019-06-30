export interface IField {
    id: string;
    label: string;
    fieldType: string;
    validationRegex?: string;
    regexErrorLabel?: string;
    isVisible: boolean;
    isMandatory: boolean;
    isEditable: boolean;
    isAutoComplete?: boolean;
    isMultiple?: boolean;
    dataEndPoint?: string;
}
