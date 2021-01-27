import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
//import { FormBuilder } from "@angular/forms";
import { SearchService } from '../services/search.service';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})

export class FetchDataComponent implements OnInit {
  public errorMessage: any = {};
  form: any = {};
  public searchResults: SearchResults[];
  searchRequest: any = [];
  languagesList: any = ['C', 'CPlusPlus', 'CSharp', 'Css', 'ObjectiveC', 'Scala', 'Java', 'JavaScript'];

  constructor(public repositoryService: RepositoryService, public http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private activeRoute: ActivatedRoute,
    public router: Router,
    private searchService: SearchService) {
    //demo data for search
    this.form.languae = 'JavaScript';
   this.form.searchbox = 'JetBrains/kotlin';
  }

  ngOnInit() {
    this.errorMessage = ' ';
  }

  AddToMyFavorites() {
    if (this.form.searchbox!='') {
      this.repositoryService.AddFavoriteRepository(this.form.searchbox).subscribe(data => {
        
      }, error => {
      });
    }
  }

  GetOptinoSetValue(selectedValue) {
    var val = null;
    switch (selectedValue.languae) {
      case 'Asp': { val = 8; break; }
      case 'C': { val = 18; break; }
      case 'CPlusPlus': { val = 31; break; }
      case 'CSharp': { val = 32; break; }
      case 'Css': { val = 33; break; }
      case 'Scala': { val = 153; break; }
      case 'Java': { val = 81; break; }
      case 'JavaScript': { val = 83; break; }
      case 'ObjectiveC': { val = 119; break; }
      default: {
        val = 32; break;
      }
    }
    return val;
  }

  onSubmit() {
    this.errorMessage = ' ';
    if (!this.form.searchbox) {
    }

    let searchRequest: any = {};
    searchRequest.RepositoryName = this.form.searchbox;
    searchRequest.Language = this.GetOptinoSetValue(this.form);

    this.searchService.SearchInRepositoryAsynct(searchRequest).subscribe(data => {
      console.log("SearchInRepositoryAsync: ", data)
      this.searchResults = data;
    }, error => {   
       this.errorMessage = (error.statusText != null && error.status != null) ? (error.statusText ) : error.message;
      //console.error(error); // To DO : error handling 
      this.searchResults = null;
    });
  }
}

interface SearchResults {
  fileName: string,
  path: string,
}
interface SearchRequest {
  Language: number,
  RepositoryName: string
}

