import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../../shared/services/categories.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {PositionsService} from "../../../shared/services/positions.service";
import {PositionsType} from "../../../../types/positions.type";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  categories: { _id: string, name: string }[] = []
  agree: boolean = false
  delete: boolean = false
  nameCategory: string = ''
  id: string = ''
  name: string = ''
  params: boolean = false

  positionsCategories: PositionsType[] = []

  positionsHidden: string[] = []
  panelOpenState:boolean = false;

  constructor(public categoriesService: CategoriesService, private _snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private positionsService: PositionsService) {
  }

  ngOnInit(): void {

    this.positionsService.getPositionHidden()
      .subscribe(data => {
        data.forEach(item => this.positionsHidden.push(item.position))
      })

    this.positionsService.getPosition()
      .subscribe({
        next: (data => {
          this.positionsCategories = data

        }),
        error: (e => {
          console.log(e)
        })
      })

    this.categoriesService.getCategory()
      .subscribe((data) => {
        this.categories = data

      })

  }

  positions(): void {
    this.params = true
    return
  }

  hiddenPosition(position: string) {
    this.positionsService.createPositionHidden(position)
      .subscribe(data => {
        this.positionsHidden.push(data.position)
      })
  }

  visiblePositions(position: string) {
    this.positionsService.deletePositionHidden(position)
      .subscribe(data => {
        this.positionsHidden = this.positionsHidden.filter(item => item !== position)
      })
  }
  remove(boolean: boolean) {
    this.delete = boolean

    if (this.delete) {
      this.categoriesService.deleteCategory(this.id)
        .subscribe({
          next: (data) => {

            this.categoriesService.getCategory()
              .subscribe((data) => {
                this.categories = data
              })

            this.agree = false
            this._snackBar.open(`Категория "${this.name}" удалена`)
          },
          error: () => {
            this._snackBar.open('Ошибка при удалении')
          },
        })
    } else {
      this.agree = false
    }
  }

  deleteCategory(id: string, name: string) {
    this.nameCategory = name
    this.agree = true
    this.name = name
    this.id = id
  }
}
