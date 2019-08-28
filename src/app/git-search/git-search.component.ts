import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
  //template: `<p> git-search works! </p>`,
  //styles: ['p { background: red; }']
  
})

export class GitSearchComponent implements OnInit {

  searchResults : GitSearch;
  searchQuery : string; 
  

  constructor(private gitSearchService : GitSearchService) { }

  ngOnInit() {

    this.gitSearchService.gitSearch('gitHub').then((response) =>{
      this.searchResults = response; 
    }, (error) => {
      alert("Error: " + error.statusText)
    })   
  }

  gitSearch = () => {
    this.gitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

}
