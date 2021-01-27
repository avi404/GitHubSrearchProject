import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private tokenStorage: TokenStorageService) { }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  Show() {
  
    var show = false;
    if (this.tokenStorage.getUser()) {
      show = true;
    }
    return show;

  }
}
