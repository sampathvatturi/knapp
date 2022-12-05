import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import mainMenu from '../../../assets/json/main-menu.json';

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

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.menuItems = mainMenu?.mainMenu;
    console.log(this.menuItems);
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.first_name = this.user_data.first_name.slice(0, 1).toUpperCase();
    this.last_name = this.user_data.last_name.slice(0, 1).toUpperCase();
    this.full_name = this.user_data.first_name + ' ' + this.user_data.last_name;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
