import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroeService } from '../../services/heroe.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {
  heroes:Heroe[]=[];
  constructor( private heroesService: HeroeService) { }

  ngOnInit(): void {

    this.heroesService.getHeroes().subscribe(
      heroes=>this.heroes=heroes)
    
  }

}
