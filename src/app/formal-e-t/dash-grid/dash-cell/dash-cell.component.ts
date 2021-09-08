import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-cell',
  templateUrl: './dash-cell.component.html',
  styleUrls: ['./dash-cell.component.scss']
})
export class DashCellComponent implements OnInit {

  @Input() index!: number;

  contentExample = ["aade", "paade", "noon", "saadhay"];

  constructor() { }

  ngOnInit(): void {
  }

}
