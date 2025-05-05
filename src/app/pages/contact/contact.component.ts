import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private snackBar: MatSnackBar) {}

  enviarFormulario(): void {
    if (
      this.contacto.nombre &&
      this.contacto.correo &&
      this.contacto.mensaje
    ) {
      // Simula envío exitoso
      console.log('Formulario enviado:', this.contacto);
      this.snackBar.open('✅ Tu mensaje fue enviado exitosamente.', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

      // Reinicia el formulario
      this.contacto = { nombre: '', correo: '', mensaje: '' };
    } else {
      // Campos requeridos no llenados
      this.snackBar.open('⚠️ Por favor llena todos los campos obligatorios.', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning']
      });
    }
  }
}
