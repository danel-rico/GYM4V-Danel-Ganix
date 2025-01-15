export class Actividad {
    constructor(
      public id: number,
      public time: string,
      public type: string,
      public isFree: boolean,
      public monitors: string[] = [],
      public date?: string 
    ) {}
  }
  