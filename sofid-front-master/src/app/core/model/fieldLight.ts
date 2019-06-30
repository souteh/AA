import { PositionField } from './position';


export interface FieldLight {

    id: number;
    name: string;
    fieldType: string;
    isEnabled: boolean;
    isVisible: boolean;
    isMandatory: boolean;
    isExportable: boolean;
    isMain: boolean;
}
