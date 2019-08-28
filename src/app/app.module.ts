import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { GitSearchService } from './git-search.service'
import { GitSearchUsersService } from './git-search-users.service';
import { GitSearchComponent } from './git-search/git-search.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  
  ],
  providers: [GitSearchService, GitSearchUsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
