
import { Component } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonMenuToggle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  homeOutline,
  appsOutline,
  receiptOutline,
  personCircleOutline,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonMenuToggle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel
  ]
})

export class AppComponent {

  pages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home-outline'
    },
    {
      title: 'Servicios',
      url: '/services',
      icon: 'apps-outline'
    },
    {
      title: 'Reservar',
      url: '/booking',
      icon: 'receipt-outline'
    },
    {
      title: 'Mi Perfil',
      url: '/profile',
      icon: 'person-circle-outline'
    }
  ];

  constructor() {
    addIcons({
      homeOutline,
      appsOutline,
      receiptOutline,
      personCircleOutline,
      chevronForwardOutline
    });
  }
}
