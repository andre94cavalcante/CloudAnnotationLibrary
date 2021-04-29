import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopbarComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

    const topbar = document.getElementById("myTopnav")
    const el = document.getElementById("hamburger");
    el.addEventListener("click", responsiveHamburger);


    function responsiveHamburger() {
      if (el.className === "icon") {
        el.className += " active";
        topbar.className += " responsive"
      } else {
        el.className = "icon";
        topbar.className = "topnav"
      }
    }
  }

}

