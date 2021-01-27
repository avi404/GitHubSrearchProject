import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-favorites-component',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {

  favoritesResults: any[];
  errorMessage: any = {};
  constructor(private repositoryService: RepositoryService) { }

  ngOnInit() {

    this.errorMessage = '';
    this.repositoryService.GetUserFavoritesAsync().subscribe(data => {
      console.log("SearchInRepositoryAsync: ", data)

      this.favoritesResults = data;
    }, error => {
      this.errorMessage = (error.statusText != null && error.status != null) ? (error.statusText + '  ' + error.status) : error.message;
      console.error(error);
      this.favoritesResults = null;

    });
  }
}
