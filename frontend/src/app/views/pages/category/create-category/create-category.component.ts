import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {ActivatedRoute, Params} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PositionsService} from "../../../../shared/services/positions.service";
import {PositionsType} from "../../../../../types/positions.type";
import {environment} from "../../../../../environments/environment";
import {ConstructorType} from "../../../../../types/constructor.type";
import {PositionHiddenType} from "../../../../../types/position-hidden.type";


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  positions: PositionsType[] = []

  createInput = this.fb.group({
    name: ['', [Validators.required]]
  })

  params: string | null = null
  category_id: string = ''
  position: boolean = false
  uploads: string = environment.uploads
  positionName: string = ''
  positionModal: PositionsType | null = null
  agree: boolean = false
  delete: boolean = false
  id: string = ''
  name: string = ''
  modalOpen: boolean = false

  positionsHidden: string[] = []

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService,
              private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              public positionsService: PositionsService,) {
  }

  ngOnInit(): void {

    this.positionsService.getPositionHidden()
      .subscribe(data => {
        data.forEach(item => this.positionsHidden.push(item.position))
      })


    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        if (params['id']) {
          this.params = params['id']
          this.createInput.get('name')?.setValue(params['name'])
        } else if (params['category_id']) {
          this.position = true
          this.category_id = params['category_id']
          this.positionName = params['position']
        }
      })


    this.positionsService.getByCategoryId(this.category_id)
      .subscribe({
        next: (data) => {
          this.positions = data
        },
        error: (e) => {
          console.log(e)
        }
      })
  }

  visiblePositions(position: string) {
    this.positionsService.deletePositionHidden(position)
      .subscribe(data => {
        this.positionsHidden = this.positionsHidden.filter(item => item !== position)

      })

  }

  hiddenPosition(position: string) {
    this.positionsService.createPositionHidden(position)
      .subscribe(data => {
        this.positionsHidden.push(data.position)

      })
  }


  remove(boolean: boolean) {
    this.delete = boolean

    if (this.delete) {
      this.positionsService.deletePosition(this.id)
        .subscribe({
          next: (data => {
            this._snackBar.open(`Позиция "${this.name}" удалена`)

            this.positionsService.getByCategoryId(this.category_id)
              .subscribe({
                next: (data) => {
                  this.positions = data

                  this.agree = false
                },
                error: (e) => {
                  console.log(e)
                }
              })
          }),
          error: (e => {
            console.log(e)
          })
        })
    } else {
      this.agree = false
    }
  }

  deletePosition(id: string, name: string) {
    this.name = name
    this.agree = true
    this.id = id
  }


  create(): void {
    if (this.createInput.value.name) {
      this.categoriesService.createCategory(this.createInput.value.name)
        .subscribe({
          next: () => {
            this._snackBar.open(`Категория "${this.createInput.value.name}" создана`)
            this.createInput.get('name')?.setValue('')
          },
          error: () => {
            this._snackBar.open(`Ошибка создания категории "${this.createInput.value.name}"`)
          }
        })
    }
  }

  editCategory() {
    if (this.createInput.value.name && this.params) {
      this.categoriesService.editCategory(this.params, this.createInput.value.name)
        .subscribe(
          {
            next: () => {
              this._snackBar.open("Категория изменена")
            },
            error: () => {
              this._snackBar.open("Ошибка при редактировании")
            }
          }
        )
    }
  }

  openModal(position: PositionsType) {
    this.positionModal = position
    this.modalOpen = true
  }

  close(event: Event) {
    this.modalOpen = false
  }

}
