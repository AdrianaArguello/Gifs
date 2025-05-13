import { Component, input } from '@angular/core';
import { GifsListItemComponent } from './list-item/list-item.component';
import { Gif } from '../../interfaces/gif.interface';


@Component({
  selector: 'gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './list.component.html'
})
export class GifsListComponent {
  gifs = input<Gif[]>([]);
}
