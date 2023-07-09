export class CommandGetListPattern {
    id: string;
    ids: string[] = [];
    intentId: string;
    intentIds: string[] = [];
    keyword: string;

    size: number = 0;
    page: number = 1;

    returnFields: string[];
    
    hasEntities: boolean = false;
    hasIntent: boolean = false;
    hasEntityTypeOfEntities: boolean = false;
    checkPageAndSize: boolean = false;
}