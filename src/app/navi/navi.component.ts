import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent {

  sideNavExpanded = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  toggleSideNav(_: Event) {
    console.log("sideNav", this.sideNavExpanded);
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

}
