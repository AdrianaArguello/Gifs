import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for(let i=0; i<this.trendingGifs().length; i+=3){
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  })
  private trendingPage = signal(0);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {

    if(this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http
    .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params : {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      },
    })
    .subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingPage.update(currentPage => currentPage++);
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params : {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      },
    }).pipe(
      map(resp => GifMapper.mapGiphyItemsToGifArray(resp.data)),
      tap(gifs => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: gifs
        }));
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
