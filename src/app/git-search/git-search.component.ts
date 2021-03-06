import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { AdvancedSearchModel } from '../advanced-search-model'
import { FormControl, FormGroup, Validators} from '@angular/forms'

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
  displayQuery: string;
  title: string;
  form: FormGroup;
  formControls = {};
  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

  constructor(
    private gitSearchService : GitSearchService, 
    private route: ActivatedRoute, 
    private router: Router) { 
      
      this.modelKeys.forEach( (key) => {
        let validators = [];
          if (key === 'q') {
            validators.push(Validators.required);
            }
          if (key === 'stars') {
            validators.push(Validators.maxLength(4))
          }      
          this.formControls[key] = new FormControl();
      })
      this.form = new FormGroup(this.formControls);
    }
    
  ngOnInit() {
    
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.searchQuery = params.get('queryText');
      this.displayQuery = params.get('queryText');
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
    let search : string = this.form.value['q'];
    let params : string = "";
    
    this.modelKeys.forEach(  (elem) => {
        if (elem === 'q') {
            return false;
        }
        if (this.form.value[elem]) {
            params += '+' + elem + ':' + this.form.value[elem];
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
