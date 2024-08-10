import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLogeIn: boolean = false;
  constructor(private _authService: AuthService) {
    _authService.loggedInUser.subscribe((res) => {
      if (res) {
        this.isLogeIn = res ? true : false;
        console.log(this.isLogeIn);
      }
    });
  }

  ngOnInit(): void {
    // this.isLogeIn = JSON.parse(localStorage.getItem('token'));
  }
}
