import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private readonly API_URL = 'http://localhost:9268/Search/';

  constructor(private http: HttpClient) { }

  SearchInRepositoryAsynct(request): Observable<any> {  
    return this.http.post(this.API_URL + 'SearchInRepositoryAsync', request, httpOptions);
  }
}