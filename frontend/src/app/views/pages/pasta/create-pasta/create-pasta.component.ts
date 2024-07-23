import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {PositionsService} from "../../../../shared/services/positions.service";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConstructorService} from "../../../../shared/services/constructor.service";
import {ConstructorType} from "../../../../../types/constructor.type";

@Component({
  selector: 'app-create-pasta',
  templateUrl: './create-pasta.component.html',
  styleUrls: ['./create-pasta.component.scss']
})
export class CreatePastaComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef | undefined;
  categories: { _id: string, name: string }[] = [];
  pasta: ConstructorType[] = []
  sauce: ConstructorType[] = []
  extra: ConstructorType[] = []
  // @ts-ignore
  image: File;
  imagePreview: string | ArrayBuffer | null = '';

  createInput = this.fb.group({
    name: ['', [Validators.required]],
    cost: ['', [Validators.required]],
    description: [''],
  })

  params: string | null = null;
  paramsPosition: string | null = null;
  uploads: string = environment.uploads;
  position: string = ''
  positionName: string = ''
  url: string = ''

  constructor(private fb: NonNullableFormBuilder,
              private constructorService: ConstructorService,
              private activatedRoute: ActivatedRoute,
              private categoriesService: CategoriesService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private location: Location) {
  }


  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      if (url[0].path === 'pasta') {
        this.position = "Пасты"
        this.url = url[0].path
      } else if (url[0].path === 'sauce') {
        this.position = "Соуса"
        this.url = url[0].path
      } else if (url[0].path === 'extra') {
        this.position = "Добавки"
        this.url = url[0].path
      }
    })

    this.activatedRoute.queryParams
      .subscribe({
        next: (params => {
          if (params['position']) {
            this.paramsPosition = params['position']
          }

        })
      })

    if (this.paramsPosition) {
      this.constructorService.getByPositionId(this.paramsPosition, this.url)
        .subscribe({
          next: (data => {
            this.positionName = data.name

            this.createInput.get('name')?.setValue(data.name)
            this.createInput.get('cost')?.setValue(String(data.cost))
            if (data.description) {
              this.createInput.get('description')?.setValue(data.description)
            }
            this.imagePreview = data.image ? this.uploads + data.image : ''

          })
        })
    }


  }

  goBack() {
    this.location.back()
  }

  triggerClick() {
    this.inputRef?.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      reader.readAsDataURL(file)
    } else {
      this._snackBar.open('Изображение должно быть "jpeg" или "png" формата')
      this.imagePreview = ''

      return
    }
  }

  create() {
    if (this.createInput.value.name && this.createInput.value.cost) {
      this.constructorService.createPosition(this.url, this.createInput.value.name, +this.createInput.value.cost, this.image, this.createInput.value.description)
        .subscribe({
          next: ((data) => {
            this.location.back()
            setTimeout(() => {
              this._snackBar.open(`Позиция "${this.createInput.value.name}" создана`)
            }, 500)

          }),
          error: (e => {
            console.log(e)
          })
        })
    }
  }

  editPosition() {
    if (this.paramsPosition && this.createInput.value.name && this.createInput.value.cost) {
      this.constructorService.updatePosition(this.url, this.paramsPosition, this.createInput.value.name, +this.createInput.value.cost, this.image, this.createInput.value.description)
        .subscribe({
          next: ((data) => {
            this.router.navigate([`/dashboard/${this.url}`])

            setTimeout(() => {
              let title = ''
              let position = ''
              if(this.url === "pasta"){
                title = 'изменена'
                position = 'Паста'
              }else if(this.url === "sauce"){
                title = 'изменен'
                position = 'Соус'
              }else{
                title = 'изменена'
                position = 'Добавка'
              }
              this._snackBar.open(position +' '+ `"${this.createInput.value.name}"` +' '+ title)
            },300)
          }),
          error: (e => {
            console.log(e)
          })
        })
    }
  }


}
