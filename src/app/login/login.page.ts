
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent
  ]  
})
export class LoginPage {

  email: string = '';
  password: string = '';
  mostrarPassword: boolean = false;

  constructor(private router: Router) {}

  iniciarSesion() {
    if (!this.email.trim() || !this.password.trim()) {
      alert('Ingrese su correo y contraseña');
      return;
    }

    // Navegación de demostración
    this.router.navigate(['/home']);
  }
}
