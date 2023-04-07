import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from './gif.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  endPointURL = environment.API_URL;

  public resultados: Gif[] = [];
  private _historial: string[] = [];

  constructor(private http: HttpClient) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial() {
    return [...this._historial];
  }

  getGifs(query: string, limit = 10) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams().set('api_key', environment.API_KEY)
    .set('limit', '10')
    .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.endPointURL}/search`, {params}).pipe(
        map((res:SearchGifsResponse) => res.data)
        )
      .subscribe((res: Gif[]) => {
        this.resultados = res;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));

      });
  }
}
