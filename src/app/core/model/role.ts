import { I18nText } from './i18nText';

export interface Role {
    id?: number;
    code: string;
    name: string;
    i18nTextName: I18nText;
    description: string;
    i18nTextDescription: I18nText;
    domainActions?: any;

}

