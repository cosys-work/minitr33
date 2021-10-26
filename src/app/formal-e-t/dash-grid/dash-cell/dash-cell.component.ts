import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dash-cell',
  templateUrl: './dash-cell.component.html',
  styleUrls: ['./dash-cell.component.scss']
})
export class DashCellComponent {

  @Input() index!: number;

}
