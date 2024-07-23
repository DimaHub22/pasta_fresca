import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PositionsType} from "../../../../types/positions.type";


@Component({
  selector: 'count-selector',
  templateUrl: './count-selector.component.html',
  styleUrls: ['./count-selector.component.scss']
})
export class CountSelectorComponent implements OnInit {

  @Input() counts: number = 0
  @Output() onCountChange: EventEmitter<number> = new EventEmitter<number>()

  @Output() onPosition: EventEmitter<PositionsType> = new EventEmitter<PositionsType>()
  @Input() position!:PositionsType

  positions:PositionsType[]=[]


  constructor() {
  }

  ngOnInit(): void {

  }

  countChange() {
    this.onCountChange.emit(this.counts)
  }

  positionChange(){
    this.onPosition.emit(this.position)
  }

  decreaseCount() {
    if (this.counts && this.counts > 0) {
      this.counts--
      this.countChange()
    }

  }

  increaseCount() {
    if (this.counts || this.counts === 0) {
      this.counts++
      this.countChange()

    }
  }

  addToCart(){

    this.position.count = this.counts
    this.onPosition.emit(this.position)

  }
}
