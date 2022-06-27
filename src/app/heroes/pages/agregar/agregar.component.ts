import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroeService } from '../../services/heroe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../component/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `img{
      width: 100%;
      border-radius: 5px;
    }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ]

  heroe: Heroe ={
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_img: ""
  }
  constructor(private heroeService:HeroeService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private snackBar:MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }
    this.activatedRoute.params
                        .pipe(
                          switchMap( ({id})=>this.heroeService.getHeroeById(id)))
                        .subscribe(
                            heroe=>this.heroe = heroe
                          
                        )}

  guardar(){
    if(this.heroe.superhero.trim().length==0){return;}


    if(this.heroe.id){
      //actualizar
      this.heroeService.actualizarHeroe(this.heroe)
      .subscribe(heroe=>this.snackbar('Registro Actualizado!'))
    } else {
      //crear
      this.heroeService.agregarHeroe(this.heroe)
          .subscribe(heroe=>{
            this.router.navigate(['/heroes/editar', heroe.id])
            this.snackbar('Registro Creado!')
          })

    }
  }

  borrarHeroe(){

      const dialog = this.dialog.open(ConfirmarComponent,{
        width:'250px',
        data: this.heroe
       })

       dialog.afterClosed().subscribe(
        (result)=>{
          if (result){
            this.heroeService.borrarHeroe(this.heroe.id!)
            .subscribe(resp=>{
              this.router.navigate(['/heroes'])
            })
          }
        }
       )

  }

  snackbar(mensaje:string){
     this.snackBar.open(mensaje, 'ok!', {
      duration:2500
     })
  }
}
