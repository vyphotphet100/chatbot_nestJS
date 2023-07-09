export class CommandGetListIntent {
  page: number = 1;
  size: number = 0;
  ids: string[] = [];
  code: string;
  codes: string[] = [];
  keyword: string;
  returnFields: string[];
  
  constructor() {
  }
}

