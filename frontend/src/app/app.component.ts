import {Component, OnInit} from '@angular/core';
import {ServiceAuthService} from "./shared/services/service-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'frontend';
  constructor(private serviceAuth: ServiceAuthService) {
  }

  ngOnInit() {

    const potentialToken = localStorage.getItem('auth-token')
    const userName = localStorage.getItem('user-db')

    if(potentialToken !== null){
      this.serviceAuth.setToken(potentialToken)
      this.serviceAuth.setName((userName as string))
    }
  }
}
