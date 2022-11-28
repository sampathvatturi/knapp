import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
    this.menuItems = mainMenu?.mainMenu;
    console.log(this.menuItems);
  }

}
