import {Component, Input, OnInit} from '@angular/core';
import {PositionsService} from "../../shared/services/positions.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {PositionsType} from "../../../types/positions.type";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {OwlOptions} from "ngx-owl-carousel-o";
import {ConstructorService} from "../../shared/services/constructor.service";
import {ConstructorType} from "../../../types/constructor.type";
import {ViewportScroller} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ServiceAuthService} from "../../shared/services/service-auth.service";
import {CountSelectorComponent} from "../../shared/components/count-selector/count-selector.component";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  customOptions: OwlOptions = {
    autoHeight: true,
    autoWidth: true,
    loop: false,
    margin: 10,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 4
      },
    },
    nav: true
  }

  categories: { _id: string, name: string }[] = []
  positionsCategories: PositionsType[] = []
  modalOpen: boolean = false
  positionModal: PositionsType | null = null
  positionModalConstructor: ConstructorType | null = null
  uploads: string = environment.uploads
  posit: string | null = null
  pathConstructor: string = ''
  categoriesId: string[] = []
  pasta: ConstructorType[] = []
  sauce: ConstructorType[] = []
  extra: ConstructorType[] = []
  loader: boolean = false
  positionsHidden: string[] = []
  searchInput = this.fb.group({
    search: ['']
  })
  positionCategory: any[] = []
  isLogget: boolean = false

  positionsCart: PositionsType[] = []

  constructor(public positionsService: PositionsService,
              public categoriesService: CategoriesService,
              private activatedRouter: ActivatedRoute,
              public constructorService: ConstructorService,
              private router: Router,
              private scroller: ViewportScroller,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private authService: ServiceAuthService,
  ) {
    this.isLogget = !!this.authService.getToken()

  }


  scroll(id: string, name?: string) {
    this.posit = id
    this.scroller.scrollToAnchor(id)
  }

  scrollTo(elem: string) {
    this.posit = elem
    this.scroller.scrollToAnchor(elem)
  }

  ngOnInit(): void {


    this.positionsService.getPositionHidden()
      .subscribe(data => {
        data.forEach(item => this.positionsHidden.push(item.position))
      })

    this.activatedRouter.url.subscribe(url => {
      url.find(item => item.path === 'constructor' ? this.pathConstructor = item.path : '')
    })


    this.categoriesService.getCategory()
      .subscribe((category) => {
        this.categories = category

        this.positionsService.getPosition()
          .subscribe({
            next: (position => {
              this.positionsCategories = position

              position.forEach(item => {
                this.categoriesId.push(item.category)
              })


              this.categories.forEach(item => this.positionCategory.push(item))

              this.searchProduct(position, category)
            }),
            error: (e => {
              console.log(e)
            })
          })

      })

    if (this.pathConstructor) {
      this.constructorService.getPosition('pasta')
        .subscribe({
          next: (data => {
            this.pasta = data

          })
        })
      this.constructorService.getPosition('sauce')
        .subscribe({
          next: (data => {
            this.sauce = data
          })
        })
      this.constructorService.getPosition('extra')
        .subscribe({
          next: (data => {
            this.extra = data
          })
        })
    }

  }


  searchProduct(position: PositionsType[], category: { _id: string, name: string }[]) {

    this.searchInput.get('search')?.valueChanges.subscribe(value => {
      if (value) {
        const positionSearch = position.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))

        if (positionSearch.length > 0) {
          this.positionsCategories = positionSearch

          const arr: { _id: string, name: string }[] = []
          positionSearch.forEach(item => {
            category.forEach(el => {
              if (item.category === el._id) {
                arr.push(el)
                this.categories = [...new Set(arr)]
              }
            })
          })

        } else {
          this._snackBar.open('По вашему запросу ни чего не найдено')
          // this.searchInput.reset()
        }

      } else {
        this.positionsCategories = position
        this.categories = category
      }
    })

  }


  openModal(position: PositionsType) {
    this.positionModal = position
    this.modalOpen = true
  }

  openModalConstructor(position: ConstructorType) {
    this.positionModalConstructor = position
    this.modalOpen = true
  }

  close(event: Event) {
    this.modalOpen = false
  }

  show(value: PositionsType) {
    this.positionsCart.push(value)
    const unique = [...new Set(this.positionsCart.map(obj => obj))];
    if (unique){
      this.positionsCart = unique
    }
if(this.positionsCart.length > 0){
  localStorage.setItem('positionCart', JSON.stringify(this.positionsCart))
  console.log(localStorage.getItem('positionCart'))
}

  }


}
