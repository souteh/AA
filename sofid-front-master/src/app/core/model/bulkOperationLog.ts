import { BulkOperationDetail } from './bulkOperationDetail';
import { BulkOperationType } from './bulkOperationType';
import { ProcessingStatus } from './bulkOperationStatus';


export interface BulkOperationLog {

    id: number;
    operationType: BulkOperationType;
    status: ProcessingStatus;
    file: string;
    errorFile: string;
    creationDate: Date;
    startDate: Date;
    endDate: Date;
    user: string;
    successCount: number;
    failureCount: number;
    details: Array<BulkOperationDetail>;

}
