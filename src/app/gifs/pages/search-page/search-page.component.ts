import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from '../../components/list/list.component';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {
  giphyService = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string){
    this.giphyService.searchGifs(query).subscribe((resp: Gif[]) => {
      this.gifs.set(resp);
    });
  }
}
