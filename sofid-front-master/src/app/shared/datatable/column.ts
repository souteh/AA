import { IFilter } from './filter';
export interface IColumn {
    label: string;
    property: string;
    type: string;
    val?: string;
    filter?: IFilter;
    disableProp?: string;
    cellTemplate?: any;
}
