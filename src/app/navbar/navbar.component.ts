import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('start nav');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  navigateToMain() {
    this.router.navigateByUrl('/main')
  }

  navigateToGraphs() {
    this.router.navigateByUrl('/charts')
  }
}
