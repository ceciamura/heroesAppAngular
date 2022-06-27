import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroeService } from '../../services/heroe.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img{
    width:100%;
    border-radius: 5px;
  }
  `

  ]
})
export class HeroeComponent implements OnInit {
  
  heroe!:Heroe;


  constructor(private activatedRoutes:ActivatedRoute,
              private heroeService:HeroeService,
              private router:Router) { }



  ngOnInit(): void {
    this.activatedRoutes.params
    .pipe(
      switchMap( ({id})=>this.heroeService.getHeroeById( id ) )
    )
    .subscribe(heroe => this.heroe = heroe)

    
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }

}
