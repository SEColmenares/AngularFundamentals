import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

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
  title: string;
  displayQuery: string;

  constructor(
    private gitSearchService : GitSearchService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();
    }
    )

    // this.gitSearchService.gitSearch('gitHub').then((response) =>{
    //   console.log(response)
    //   this.searchResults = response; 
    // }, (error) => {
    //   alert("Error: " + error.statusText)
    // })   

    this.route.data.subscribe((result) => {
      this.title = result.title
    });
  }

  gitSearch = () => {
    this.gitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  sendQuery = () => {
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery])
  }

}
