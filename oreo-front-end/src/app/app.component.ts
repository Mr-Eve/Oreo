import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { AppGlobalService } from './global/service/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <div class="mask" *ngIf="mask"></div>
  <router-outlet></router-outlet>
  `,
  styles: [
    `
    .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        height: 100%;
        background-color: rgba(0,0,0,.65);
        filter: alpha(opacity=50);
    }
    `
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  mask = false;
  constructor(
    private analytics: AnalyticsService,
    private globalService: AppGlobalService,
  ) { }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.subscription = this.globalService.watchMask.subscribe((v: boolean) => {
      this.mask = v;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

        // width: 100%;
        // height: 100%;
        // position: absolute;
        // opacity:0.5;
        // z-index: 1040;
