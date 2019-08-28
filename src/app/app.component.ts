import { Component, OnInit } from '@angular/core';
import { GitSearchService } from './git-search.service'
import { GitSearchUsersService } from './git-search-users.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = 'app is functional!';

  constructor(private gitSearchService : GitSearchService, private gitSearchUsers : GitSearchUsersService){

  }

  ngOnInit(){
   }
}
