import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasosExitoService } from 'src/app/services/casos-exito.service';

@Component({
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.scss']
})
export class DetalleCasoComponent implements OnInit {
  caso: any;

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
