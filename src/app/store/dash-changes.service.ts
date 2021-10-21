import {Injectable} from '@angular/core';
import {ChangeSettersService} from "./change-setters.service";
import {ChangeGettersService} from "./change-getters.service";

@Injectable({
  providedIn: 'root'
})
export class DashChangesService {

  constructor(
    public set: ChangeSettersService,
    public get: ChangeGettersService,
  ) {}

}
