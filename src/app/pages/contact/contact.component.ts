import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contacto = {
    nombre: '',
    correo: '',
    mensaje: ''
  };

  isSubmitting = false;

  constructor(private snackBar: MatSnackBar) {}

  enviarFormulario(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    const templateParams = {
      name: this.contacto.nombre,
      email: this.contacto.correo,
      title: this.contacto.mensaje
    };

    emailjs.send(
      'service_v52x7rt',      // Reemplaza con tu service_id de EmailJS
      'template_mid129c',     // Reemplaza con tu template_id de EmailJS
      templateParams,
      environment.emailJsPublicKey // Reemplaza con tu public_key de EmailJS
    ).then(() => {
      this.snackBar.open('Mensaje enviado correctamente ✅', 'Cerrar', {
        duration: 4000
      });
      this.contacto = { nombre: '', correo: '', mensaje: '' };
    }).catch((error) => {
      console.error('❌ Error al enviar el mensaje:', error);
      this.snackBar.open('Error al enviar el mensaje ❌', 'Cerrar', {
        duration: 4000
      });
    }).finally(() => {
      this.isSubmitting = false;
    });
  }
}
