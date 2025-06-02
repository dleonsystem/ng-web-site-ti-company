import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CasosExitoService } from 'src/app/services/casos-exito.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.scss'], 
  imports: [MatChipsModule, MaterialModule, RouterModule]
})
export class DetalleCasoComponent implements OnInit, OnDestroy {
  caso: any = {};
  private langChangeSubscription: Subscription = new Subscription();
  private clave: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private casosService: CasosExitoService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.clave = this.route.snapshot.paramMap.get('clave');
    this.cargarCaso();
    
    // Suscribirse a cambios de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.cargarCaso();
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  private cargarCaso(): void {
    if (this.clave) {
      this.casosService.obtenerCasoPorClave(this.clave).subscribe((caso: any) => {
        this.caso = caso || {};
      });
    }
  }
}