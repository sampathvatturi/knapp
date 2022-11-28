import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import mainMenu from '../../../assets/json/main-menu.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = '';
  isCollapsed = false;
  menuItems: any;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.menuItems = mainMenu?.mainMenu;
    console.log(this.menuItems);
  }
  gotoLogin(){
    this.route.navigateByUrl('/login')
  }
}
