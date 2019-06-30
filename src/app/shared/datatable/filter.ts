export interface IFilter {
    type: string;
    values ?: IRefData[];
}

export interface IRefData {
    key: string ;
     value: string;
}
