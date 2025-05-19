import { Component, OnInit } from '@angular/core';
import { CasosExitoService } from '../services/casos-exito.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit{
 caso: any;
 cases: any[] = [];

  constructor(private route: ActivatedRoute, private service: CasosExitoService) {}

  ngOnInit(): void {
    this.service.obtenerCasos().subscribe(data => {
      this.cases = data;
      console.log(this.cases);
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.caso = this.cases.find(c => c.id === id);
  }
}
