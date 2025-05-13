import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifsListComponent } from '../../components/list/list.component';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service.ts.service';


@Component({
  selector: 'app-trending',
  // imports: [GifsListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingComponent implements AfterViewInit {
  gifService = inject(GifsService);
  // gifs = computed(() => this.gifService.trendingGifs());

  scrollDivRef = viewChild<ElementRef>('groupDiv');
  scrollStateService = inject(ScrollStateService);

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.updateScrollState(scrollTop);

    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }
  }
}
