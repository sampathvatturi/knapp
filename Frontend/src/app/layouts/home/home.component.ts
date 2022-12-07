import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import mainMenu from '../../../assets/json/main-menu.json';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title: string = '';
  isCollapsed = false;
  menuItems: any;
  user_data: any;
  first_name: any;
  last_name: any;
  full_name: any;
  deptData: any;

  constructor(private route: Router, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.menuItems = mainMenu?.mainMenu;
    console.log(this.menuItems);
    this.user_data = sessionStorage.getItem('user_data');
    if(this.user_data) {      
      this.user_data = JSON.parse(this.user_data);
      this.first_name = this.user_data.first_name.slice(0, 1).toUpperCase();
      this.last_name = this.user_data.last_name.slice(0, 1).toUpperCase();
      this.full_name = this.user_data.first_name + ' ' + this.user_data.last_name;
      this.getDepartments();
    } else {
      this.logout();
    }
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe((res) => {
      const departmentsData = res;
      this.deptData = departmentsData.find((item: any)=> (item?.department_id === this.user_data?.department_id));
    });
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
