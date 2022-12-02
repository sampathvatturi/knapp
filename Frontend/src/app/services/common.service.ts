import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private api: ApiService) { }

  departments = new Array()
  getRowNameById(table:string,id:any){
    if(table === 'department'){
      if(this.departments.length<=0){
        this.api.getCall('/dept/getDepts').subscribe((res) => {
          res.forEach((element:any) => {
            this.departments[element['department_id']] = element['department_name'];
          });
        });
        return this.departments[id];
      }else{
        return this.departments[id];
      }
    }
  }
}
