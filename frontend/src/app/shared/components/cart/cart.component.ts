import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConstructorType} from "../../../../types/constructor.type";
import {environment} from "../../../../environments/environment";
import {ConstructorService} from "../../services/constructor.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PositionsService} from "../../services/positions.service";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input('pasta') pasta!: ConstructorType
  @Input('url') url!: string
  @Output() update: EventEmitter<string> = new EventEmitter<string>()

  agree: boolean = false
  delete: boolean = false
  uploads: string = environment.uploads;
  positionModal:ConstructorType | null = null
  modalOpen:boolean = false

  positionsHidden: string[] = []
  constructor(public constructorService: ConstructorService,
              private router: Router,
              private _snackBar: MatSnackBar,
              public positionsService: PositionsService) {

  }

  ngOnInit(): void {
    this.positionsService.getPositionHidden()
      .subscribe(data => {
        data.forEach(item => this.positionsHidden.push(item.position))
      })
  }

  navigate(id: string) {
    this.router.navigate([`dashboard/${this.url}/create`], {queryParams: {position: id}})
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
      this.constructorService.deletePosition(this.pasta._id, this.url)
        .subscribe({
          next: (data => {
            this.update.emit(this.url)
            this._snackBar.open(`Позиция "${this.pasta.name}" удалена`)

            this.agree = false
          }),
          error: (e => {
            console.log(e)
          })
        })
    } else {
      this.agree = false
    }
  }

  deletePosition() {
    this.agree = true

  }

  openModal(position:ConstructorType){
    this.positionModal = position
    this.modalOpen = true
  }

  close(event: Event) {
    this.modalOpen = false
  }
}
