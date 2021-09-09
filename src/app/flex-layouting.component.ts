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
      `
      .content {
          min-width: 100px;
      }

      .bounds {
          background-color:#ddd;
          height: 100%;
      }

      .col-a {
          width: 45%;
          margin: 2.5%;
      }

      .col-b {
          width: 45%;
          margin: 2.5%;
      }
      
      `
    ]
})
export class FlexLayoutType extends FieldType {
}