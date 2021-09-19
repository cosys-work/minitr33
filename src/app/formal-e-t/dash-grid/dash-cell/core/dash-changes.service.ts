import {Injectable} from '@angular/core';
import {FieldRefs} from 'src/app/shared/field.model';
import {FieldRefsStoreService} from 'src/app/store/field-refs-store.service';
import {FormCursorStoreService} from 'src/app/store/form-cursor-store.service';
import {ChangeSettersService} from "./change-setters.service";
import {ChangeGettersService} from "./change-getters.service";

@Injectable({
  providedIn: 'root'
})
export class DashChangesService {

  constructor(
    private fieldRefsStore: FieldRefsStoreService,
    private cursorStore: FormCursorStoreService,
    public set: ChangeSettersService,
    public get: ChangeGettersService,
  ) {
    this.cursorStore.current.subscribe(cursor => {
      if (cursor >= 0 && cursor <= this.fieldRefsStore.state.length) {
        const refs: FieldRefs = this.fieldRefsStore.state[cursor];
        if (refs) {
          this.set.label = refs.label;
          this.set.type = refs.type;
          this.set.description = refs.description;
          this.set.placeholder = refs.placeholder;

          this.set.id = refs.id;
          this.set.options = refs.options;
          this.set.attributes = refs.attributes;
          this.set.pattern = refs.pattern;

          this.set.required = refs.required ?? false;
          this.set.disabled = refs.disabled ?? false;
          this.set.hidden = refs.hidden ?? false;
          this.set.readonly = refs.readonly ?? false;

          this.set.tabindex = refs.tabindex ?? cursor;
          this.set.max = refs.max ?? 1_000_000_000;
          this.set.min = refs.min ?? 0;
          this.set.step = refs.step ?? 1;

          // Object.assign(this.set, refs);
          // Object.keys(refs).forEach((prop) => {
          //   if (this.set.hasOwnProperty(prop) && refs.hasOwnProperty(prop)) {
          //     this.set[prop] = refs[prop] ?? this.set[prop];
          //   }
          // });
        }
    }});
  }

}
