import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const clearIcon = document.getElementById("clear");
    // this.searchText = (<HTMLInputElement>event.target).value;

    // searchBar.addEventListener("keyup", () => {
    //   if (searchBar.val() && clearIcon.style.visibility != "visible") {
    //     clearIcon.style.visibility = "visible";
    //   } else if (!searchBar.val()) {
    //     clearIcon.style.visibility = "hidden";
    //   }
    // });

    // clearIcon.addEventListener("click", () => {
    //   searchBar.val() = "";
    //   clearIcon.style.visibility = "hidden";
    // })

  }

}
