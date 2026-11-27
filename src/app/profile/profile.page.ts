
import { Component } from '@angular/core';

import {
  IonContent,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonMenuButton
} from '@ionic/angular';

import { ToastController } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  shieldCheckmark,
  person,
  lockClosed,
  notifications,
  settings,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonMenuButton
  ]
})
export class ProfilePage {

  nombre = 'Robert Rodríguez';
  correo = 'robertrodriguez4@gmail.com';

  constructor(private toastController: ToastController) {
    addIcons({
      shieldCheckmark,
      person,
      lockClosed,
      notifications,
      settings,
      chevronForwardOutline
    });
  }

  async abrirOpcion(opcion: string): Promise<void> {
    const mensajes: Record<string, string> = {
      personal: 'Información personal estará disponible próximamente.',
      security: 'La configuración de seguridad estará disponible próximamente.',
      notifications: 'Las preferencias de notificaciones estarán disponibles próximamente.',
      preferences: 'La configuración de preferencias estará disponible próximamente.'
    };

    const toast = await this.toastController.create({
      message: mensajes[opcion] || 'Opción no disponible.',
      duration: 2200,
      position: 'bottom',
      color: 'dark'
    });

    await toast.present();
  }
}
