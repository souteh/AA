import { ProcessingStatus } from './bulkOperationStatus';
export interface HistoryExport {
    id: number;
    generatedDate: Date;
    endDate: Date;
    executedBy: string;
    number: number;
    processingTime: number;
    exportStatus: ProcessingStatus;
    documentType: DocumentType;
    url: string;


}
