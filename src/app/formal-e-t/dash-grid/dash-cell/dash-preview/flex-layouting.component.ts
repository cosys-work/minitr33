import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-form-flex',
  template: `
    <div
      class="content" 
      [fxLayout]="to.fxLayout" 
      fxLayout.xs="column" 
      fxFlexFill
    >
      <formly-field *ngFor="let f of field.fieldGroup" [field]="f">
      </formly-field>
    </div>
  `,
  styles: [
      `.content {
          min-width: 100px;
      }`
    ]
})
export class FlexLayoutType extends FieldType {
}