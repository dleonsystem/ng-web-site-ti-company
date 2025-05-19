import { Component, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CasosExitoService } from 'src/app/services/casos-exito.service';

@Component({
  standalone: true,
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.scss'], 
  imports: [MatChipsModule, MaterialModule, RouterModule]
})
export class DetalleCasoComponent implements OnInit {
  caso: any= {};

  constructor(private route: ActivatedRoute, private casosService: CasosExitoService) {}

  ngOnInit(): void {
    const clave = this.route.snapshot.paramMap.get('clave');
  if (clave) {
    this.casosService.obtenerCasoPorClave(clave).subscribe((caso: any) => {
      this.caso = caso;
    });
  }
  }
}
