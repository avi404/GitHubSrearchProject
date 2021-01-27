import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {
    private readonly API_URL = 'http://localhost:9268/FavoritesRepository/';

    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

    AddFavoriteRepository(repositoryName): Observable<any> {       
        let requestToServer: any = {};
        requestToServer.repositoryName = repositoryName
        requestToServer.userName = this.tokenStorageService.getUser();
        return this.http.post(this.API_URL + 'AddFavoriteRepository', requestToServer, httpOptions);
    }

    public GetUserFavoritesAsync(): Observable<any> {
        var user = this.tokenStorageService.getUser();
        return this.http.get(this.API_URL + 'GetUserFavoritesAsync?userName=' + user, httpOptions);
    }
}