import { Component, OnInit } from '@angular/core';
import mainMenu from '../../../assets/json/main-menu.json';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  title: string = '';
  menuItems: any;
  constructor() { }

  ngOnInit(): void {
    this.menuItems = mainMenu?.mainMenu;
    console.log(this.menuItems);
  }

}
