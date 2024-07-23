import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, NonNullableFormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PositionsService} from "../../../../shared/services/positions.service";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {environment} from "../../../../../environments/environment";
import {Location} from '@angular/common';


@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.scss']
})
export class CreatePositionComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef | undefined;
  categories: { _id: string, name: string }[] = [];
  selectedDevice = 'Выберете категорию';
  // @ts-ignore
  image: File;
  imagePreview: string | ArrayBuffer | null = '';

  createInput = this.fb.group({
    name: ['', [Validators.required]],
    cost: ['', [Validators.required]],
    description: [''],
    select:['',[Validators.required]]
  })

  params: string | null = null;
  paramsCategory: string | null = null;
  paramsPosition: string | null = null;
  uploads: string = environment.uploads;


  constructor(private fb: NonNullableFormBuilder,
              private positionsService: PositionsService,
              private activatedRoute: ActivatedRoute,
              private categoriesService: CategoriesService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private location: Location
  ) {
}

ngOnInit(): void {

this.positionsService.getPosition()
  .subscribe({
    next: (data => {
      const pos = data.find(item => item._id === this.paramsPosition)
      if (pos) {
        this.createInput.get('name')?.setValue(pos.name)
        this.createInput.get('cost')?.setValue(String(pos.cost))
        this.createInput.get('description')?.setValue(pos.description)
        this.imagePreview = pos.image ? this.uploads + pos.image : ''
      }
    })
  })


this.categoriesService.getCategory()
  .subscribe({
    next: ((data) => {
      this.categories = data
      if (this.paramsCategory) {
        const category = this.categories.find(item => item.name === this.paramsCategory)
        if (category) {
          this.selectedDevice = category._id
        }
      }
    })
  })

this.activatedRoute.queryParams
  .subscribe((params: Params) => {

    if (params['id']) {
      this.params = params['id']
      this.createInput.get('name')?.setValue(params['name'])
    } else if (params['category']) {
      this.paramsCategory = params['category']
      this.paramsPosition = params['position']

    }
  })

}

goBack(): void {
  this.location.back();
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
  if (this.selectedDevice !== 'Выберете категорию') {
    if (this.createInput.value.name && this.createInput.value.cost && this.createInput.value.description) {
      this.positionsService.createPosition(this.createInput.value.name, +this.createInput.value.cost, this.createInput.value.description, this.image, this.selectedDevice)
        .subscribe({
          next: ((data) => {
            this.location.back()
            setTimeout(() =>{
              this._snackBar.open(`Позиция "${this.createInput.value.name}" создана`)
            },500)

          }),
          error: (e => {
            console.log(e)
          })
        })
    }
  }else{
    this._snackBar.open('Выберите категорию')
  }
}

editPosition() {
  if (this.paramsPosition && this.createInput.value.name && this.createInput.value.cost && this.createInput.value.description) {
    this.positionsService.updatePosition(this.paramsPosition, this.createInput.value.name, +this.createInput.value.cost, this.createInput.value.description, this.image, this.selectedDevice)
      .subscribe({
        next: ((data) => {
          this.router.navigate(['/dashboard/category'])
          console.log(data)
        }),
        error: (e => {
          console.log(e)
        })
      })
  }

}


}
