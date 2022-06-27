import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroeService } from '../../services/heroe.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {


   termino:string="";
   heroes:Heroe[]=[];
   heroeSeleccionado!:Heroe;

  constructor( private heroesService:HeroeService) { }

  ngOnInit(): void {
  }


  buscando(){
  this.heroesService.getSugerencias(this.termino.trim()).subscribe(
    heroes=>this.heroes=heroes
  )
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    if (!event.option.value){
     return;
    }
    
    const heroe:Heroe= event.option.value;
    this.termino=heroe.superhero;

    this.heroesService.getHeroeById(heroe.id!).subscribe(
      heroe=>this.heroeSeleccionado=heroe);
    }
  }

