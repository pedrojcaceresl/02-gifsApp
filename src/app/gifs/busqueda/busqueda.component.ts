import { GifsService } from './../services/gifs.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  @ViewChild('txtBuscar') private txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {}

  buscar() {
    const value = this.txtBuscar.nativeElement.value;
    if (!value.length) return;
    this.gifsService.getGifs(value);

    this.txtBuscar.nativeElement.value = '';
  }
}
