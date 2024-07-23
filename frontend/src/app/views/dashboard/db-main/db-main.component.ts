import {Component, OnInit} from '@angular/core';
import {ServiceAuthService} from "../../../shared/services/service-auth.service";
import {Router} from "@angular/router";

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-db-main',
  templateUrl: './db-main.component.html',
  styleUrls: ['./db-main.component.scss'],
})
export class DbMainComponent implements OnInit {
  public user: string = ''
  open: boolean = false

  constructor(private serviceAuth: ServiceAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.serviceAuth.users
  }

  logout() {
    this.serviceAuth.logout()
    if (!this.serviceAuth.getToken()) {
      this.router.navigate(['/'])
    }

  }

  toggle() {
    this.open = true
    // this.open = !this.open
  }
}
