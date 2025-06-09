import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contacto: any = {
   
  };

  isSubmitting = false; // Control del botón
  formEnviado = false; // Para mostrar mensaje de éxito

  constructor(private readonly snackBar: MatSnackBar, private readonly route: ActivatedRoute, private readonly seoService: SeoService, private readonly translateService: TranslateService) {}
   ngOnInit(): void {
     this.seoService.setContactPage();
    // Captura parámetro ?proyecto de la URL si existe
    this.contacto = {
      nombre: '',
      correo: '',
      mensaje: '',
      proyecto: this.route.snapshot.queryParamMap.get('proyecto') || ''
    };
  }

  // Validación de email mejorada
  private validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  enviarFormulario(): void {
    // Sanitizar datos
    this.contacto.nombre = this.contacto.nombre.trim();
    this.contacto.correo = this.contacto.correo.trim().toLowerCase();
    this.contacto.mensaje = this.contacto.mensaje.trim();
    
    // Validación mejorada
    if (!this.contacto.nombre || this.contacto.nombre.length < 3 ||
        !this.contacto.correo || !this.validarEmail(this.contacto.correo) ||
        !this.contacto.mensaje || this.contacto.mensaje.length < 10) {
      this.snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', {
        duration: 4000
      });
      return;
    }

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    const templateParams = {
      name: this.contacto.nombre,
      email: this.contacto.correo,
      title: this.contacto.mensaje,
      proyecto: this.contacto.proyecto || 'No especificado'
    };
const idiomaActual = this.translateService.currentLang as 'es' | 'en' || 'es';

    emailjs.send(
      'service_v52x7rt',
      idiomaActual=='es'?'template_xlveajg':'template_mid129c',
      templateParams,
      environment.emailJsPublicKey
    ).then(() => {
      this.formEnviado = true;
      this.snackBar.open('Mensaje enviado correctamente ✅', 'Cerrar', {
        duration: 4000
      });
      this.contacto = { nombre: '', correo: '', mensaje: '', proyecto: '' };
    }).catch((error) => {
      console.error('❌ Error al enviar el mensaje:', error);
      
      let errorMessage = 'Error al enviar el mensaje ❌';
      if (error.status === 400) {
        errorMessage = 'Datos del formulario incorrectos';
      } else if (error.status === 429) {
        errorMessage = 'Demasiados intentos. Intenta más tarde';
      }
      
      this.snackBar.open(errorMessage, 'Cerrar', {
        duration: 4000
      });
    }).finally(() => {
      this.isSubmitting = false;
    });
  }
}