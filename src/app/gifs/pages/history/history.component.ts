import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from '../../components/list/list.component';

@Component({
  selector: 'gifs-history',
  imports: [GifsListComponent],
  templateUrl: './history.component.html'
})
export default class HistoryComponent {
  gifsService = inject(GifsService);
  query = toSignal(inject(ActivatedRoute).params.pipe(
    map((params) => params['query'])
  ));
  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()));
}
