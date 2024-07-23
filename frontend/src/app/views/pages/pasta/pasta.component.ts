import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ConstructorType} from "../../../../types/constructor.type";
import {ConstructorService} from "../../../shared/services/constructor.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.component.html',
  styleUrls: ['./pasta.component.scss']
})
export class PastaComponent implements OnInit {
  path: string = ''
  title: string = ''
  titleFree: string = ''
  url: string = ''
  pasta: ConstructorType[] = []
  sauce: ConstructorType[] = []
  extra: ConstructorType[] = []
  uploads: string = environment.uploads;

  constructor(private activateRouter: ActivatedRoute,
              private router: Router,
              private constructorService: ConstructorService,) {
  }

  update(event: string) {
    this.constructorService.getPosition(event)
      .subscribe({
        next: (data => {
          if (this.url === 'pasta') {
            this.pasta = data
          } else if (this.url === 'sauce') {
            this.sauce = data
          } else if (this.url === 'extra') {
            this.extra = data
          }
        })
      })
  }

  ngOnInit(): void {
    this.activateRouter.url.subscribe(url => {
      url.find(item => {
        this.path = item.path
        if (item.path === 'pasta') {
          this.title = 'Паста'
          this.titleFree = 'паст'
          this.url = url[0].path
        } else if (item.path === 'sauce') {
          this.title = 'Соус'
          this.titleFree = 'соусов'
          this.url = url[0].path
        } else if (item.path === 'extra') {
          this.title = 'Добавки'
          this.titleFree = 'добавок'
          this.url = url[0].path
        }
      })
    })

    this.constructorService.getPosition(this.url)
      .subscribe({
        next: (data => {
          if (this.url === 'pasta') {
            this.pasta = data
          } else if (this.url === 'sauce') {
            this.sauce = data
          } else if (this.url === 'extra') {
            this.extra = data
          }
        })
      })

  }


  navigate() {
    this.router.navigate([`dashboard/${this.path}/create`])
  }
}
