import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {
   trendingScrollState = signal(0);

  updateScrollState = (scrollTop: number) => {
    this.trendingScrollState.set(scrollTop);
  }
}
