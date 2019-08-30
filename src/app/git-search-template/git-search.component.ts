import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { AdvancedSearchModel } from '../advanced-search-model'
import { ObjectUnsubscribedError } from 'rxjs';

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
  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

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
    let search : string = this.model.q;
    let params : string = "";
    this.modelKeys.forEach(  (elem) => {
        if (elem === 'q') {
            return false;
        }
        if (this.model[elem]) {
            params += '+' + elem + ':' + this.model[elem];
        }
    })
    this.searchQuery = search;
    if (params !== '') {
        this.searchQuery = search + '+' + params;
    }
    this.displayQuery = search;
    this.gitSearch();
}

}
