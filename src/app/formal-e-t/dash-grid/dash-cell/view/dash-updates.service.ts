import { Injectable } from '@angular/core';
import { FormalFieldsStoreService } from 'src/app/store/formal-fields-store.service';
import { GrafStore } from 'src/app/store/graf-store.service';
import { DashChangesService } from '../core/dash-changes.service';
import { merge } from 'rxjs';
import { FieldId } from 'src/app/shared/field.model';
import { FormCursorStoreService } from 'src/app/store/form-cursor-store.service';

@Injectable({
  providedIn: 'root'
})
export class DashUpdatesService {

  cursor: number = 0;

  change: any = { id: 0 };

  constructor(
    private changes: DashChangesService,
    private fields: FormalFieldsStoreService,
    private graph: GrafStore,
    private cursorStore: FormCursorStoreService,
  ) { }

  updateWhenContentUpdates() {
    
    this.changes.stream.subscribe(a => {
      switch (this.change.id) {
        case FieldId.type:
          break;
        case FieldId.label:
          break;
        case FieldId.placeholder:
          break;
        case FieldId.description:
          break;
        case FieldId.traits:
          break;
        case FieldId.relations:
          break;
        case FieldId.max:
          break;
        case FieldId.min:
          break;
        default:
          console.log('woah', a);
          break;
      }
    });
  }
}
