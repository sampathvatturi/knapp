import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Department {
  department_id: number,
  department_name: string,
  ranking: number,
  status: string,
  created_date: string,
  created_by: number,
  updated_date: string,
  updated_by: number,
  department_code: string
};
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _http: HttpClient) { }
  private _url = "../assets/json/department.json";

  getData(): Observable<Department[]> {
    return this._http.get<Department[]>(this._url)
  }
}
