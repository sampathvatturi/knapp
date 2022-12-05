import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GlobalConstants } from '../shared/global_constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  deptNames:any = {};
  department: any[] = [];

  constructor(private api: ApiService) { }

  departments = new Array()
  getRowNameById(table:string,id:any){
    if(table === 'department'){
      for (let x of this.department){
        this.deptNames[x.department_id] = x.department_name;
      }
      GlobalConstants.globalDept = this.deptNames;
      console.log(GlobalConstants.globalDept);
    }
  }


}
