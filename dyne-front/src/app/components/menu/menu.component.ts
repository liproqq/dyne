import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  constructor(private authService: AuthService,
    private router: Router) { }
    
    
    ngOnInit(): void {
    }
    
  isLoggedIn = this.authService.isLoggedIn();

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
