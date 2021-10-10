import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {interval, Observable} from 'rxjs';
import {map, shareReplay, take} from 'rxjs/operators';

const SIDEBAR_COLLAPSE_TIME = 1000;

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  sideNavExpanded = false;

  @ViewChild('drawer', { static: false}) drawer!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  toggleSideNav(_: Event) {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    interval(SIDEBAR_COLLAPSE_TIME).pipe(take(1)).subscribe(async () => {
      if (this.drawer.opened) {
        await this.drawer.toggle();
      }
    })
  }
}
