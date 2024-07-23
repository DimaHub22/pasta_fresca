import { Component, OnInit } from '@angular/core';
import {PositionsType} from "../../../../types/positions.type";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {
  positions:PositionsType[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
