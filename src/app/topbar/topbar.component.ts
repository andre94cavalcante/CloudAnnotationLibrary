import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  constructor() {}

  responsiveHamburger = () => {
    let topbar = document.getElementById('myTopnav');
    let el = document.getElementById('hamburger');
    if (el.className === 'icon') {
      el.className += ' active';
      topbar.className += ' responsive';
    } else {
      el.className = 'icon';
      topbar.className = 'topnav';
    }
  };

  ngOnInit(): void {}
}
