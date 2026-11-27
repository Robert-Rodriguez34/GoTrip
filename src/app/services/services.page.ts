
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  ActionSheetController,
  ToastController,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonList,
  IonItem,
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  notificationsOutline,
  chevronDownOutline,
  chevronForwardOutline,
  locationOutline,
  timeOutline,
  informationCircleOutline,
  calendarOutline,
} from 'ionicons/icons';


// =====================================
// INTERFAZ DE SERVICIOS
// =====================================

interface Service {
  name: string;
  minutes: number;
  img?: string;
  desc?: string;
  tag?: string;
  route?: string;
}


// =====================================
// COMPONENTE SERVICES
// =====================================

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,

  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonList,
    IonItem,
  ],
})


export class ServicesPage {

  // =====================================
  // SERVICIOS PRINCIPALES
  // =====================================

  private readonly baseMain: Service[] = [

    {
      name: 'Viajes',
      minutes: 40,
      img: 'assets/img/autob.png',
      route: '/booking'
    },

    {
      name: 'Motos',
      minutes: 40,
      img: 'assets/img/motob.png',
      route: '/booking'
    },

    {
      name: 'Aeropuerto',
      minutes: 50,
      img: 'assets/img/viaje3d.png',
      route: '/booking'
    },

    {
      name: 'Alimentos',
      minutes: 20,
      img: 'assets/img/comida.png',
      route: '/booking'
    },

  ];

  mainServices: Service[] = [...this.baseMain];


  // =====================================
  // OTROS SERVICIOS
  // =====================================

  otherServices: Service[] = [

    {
      name: 'Compras',
      desc: 'Encuentra productos variados.',
      minutes: 30,
      img: 'assets/img/image 18.png',
      tag: '#b8651b',
    },

    {
      name: 'Pedidos',
      desc: 'Recibe tus pedidos de forma rápida.',
      minutes: 30,
      img: 'assets/img/image 15.png',
      tag: '#7a4a24',
    },

    {
      name: 'Paquetes',
      desc: 'Envía y recibe paquetes.',
      minutes: 30,
      img: 'assets/img/image 16.png',
      tag: '#1f5fbf',
    },

    {
      name: 'Cuidado personal',
      desc: 'Encuentra productos de cuidado personal.',
      minutes: 30,
      img: 'assets/img/image 17.png',
      tag: '#1f3f9f',
    },

  ];


  // =====================================
  // CONTROL DE LONG PRESS
  // =====================================

  private pressTimer?: ReturnType<typeof setTimeout>;

  private startX = 0;
  private startY = 0;

  private readonly LONG_PRESS_MS = 600;
  private readonly MOVE_TOLERANCE = 10;

  private longPressTriggered = false;
  private suppressNextClick = false;

  private clickResetTimer?: ReturnType<typeof setTimeout>;


  // =====================================
  // CONSTRUCTOR
  // =====================================

  constructor(
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController
  ) {

    addIcons({
      notificationsOutline,
      chevronDownOutline,
      chevronForwardOutline,
      locationOutline,
      timeOutline,
      informationCircleOutline,
      calendarOutline,
    });

  }


  // =====================================
  // PULL TO REFRESH
  // =====================================

  async handleRefresh(event: CustomEvent) {

    setTimeout(async () => {

      this.mainServices = [...this.baseMain];

      (event.target as HTMLIonRefresherElement).complete();

      await this.showToast('Servicios actualizados');

    }, 1200);

  }


  // =====================================
  // ORDENAR SERVICIOS
  // =====================================

  async openSort() {

    const sheet = await this.actionSheetCtrl.create({

      header: 'Ordenar servicios',

      buttons: [

        {
          text: 'Más rápido primero',

          handler: () => {

            this.mainServices = [...this.mainServices].sort(
              (a, b) => a.minutes - b.minutes
            );

          },
        },

        {
          text: 'Nombre (A-Z)',

          handler: () => {

            this.mainServices = [...this.mainServices].sort(
              (a, b) => a.name.localeCompare(b.name)
            );

          },
        },

        {
          text: 'Cancelar',
          role: 'cancel',
        },

      ],

    });

    await sheet.present();

  }


  // =====================================
  // INICIAR PULSACIÓN PROLONGADA
  // =====================================

  startPress(ev: PointerEvent, service: Service) {

    const target = ev.target as HTMLElement;

    if (target.closest('ion-button, button, a')) {
      return;
    }

    this.cancelPress();

    this.longPressTriggered = false;

    this.startX = ev.clientX;
    this.startY = ev.clientY;

    this.pressTimer = setTimeout(() => {

      this.longPressTriggered = true;

      this.openServiceOptions(service);

    }, this.LONG_PRESS_MS);

  }


  // =====================================
  // DETECTAR MOVIMIENTO
  // =====================================

  movePress(ev: PointerEvent) {

    const moved =
      Math.abs(ev.clientX - this.startX) > this.MOVE_TOLERANCE ||
      Math.abs(ev.clientY - this.startY) > this.MOVE_TOLERANCE;

    if (moved) {
      this.cancelPress();
    }

  }


  // =====================================
  // FINALIZAR PULSACIÓN
  // =====================================

  endPress() {

    this.cancelPress();

    if (this.longPressTriggered) {

      this.suppressNextClick = true;

      this.longPressTriggered = false;

      if (this.clickResetTimer) {
        clearTimeout(this.clickResetTimer);
      }

      this.clickResetTimer = setTimeout(() => {

        this.suppressNextClick = false;
        this.clickResetTimer = undefined;

      }, 500);

    }

  }


  // =====================================
  // CANCELAR TEMPORIZADOR
  // =====================================

  private cancelPress() {

    if (this.pressTimer) {

      clearTimeout(this.pressTimer);

      this.pressTimer = undefined;

    }

  }


  // =====================================
  // MENÚ CONTEXTUAL DEL SERVICIO
  // =====================================

  async openServiceOptions(service: Service) {

    const sheet = await this.actionSheetCtrl.create({

      header: service.name,

      subHeader: service.desc ||
        `Tiempo estimado: ${service.minutes} minutos`,

      buttons: [

        {
          text: 'Ver detalles',
          icon: 'information-circle-outline',

          handler: () => {

            this.showToast(
              `${service.name}: tiempo estimado ${service.minutes} minutos`
            );

          }

        },

        {
          text: 'Reservar servicio',
          icon: 'calendar-outline',

          handler: () => {

            this.navigateService(service);

          }

        },

        {
          text: 'Cancelar',
          role: 'cancel'

        }

      ]

    });

    await sheet.present();

  }


  // =====================================
  // ABRIR SERVICIO
  // =====================================

  openService(service: Service) {

    if (this.suppressNextClick) {

      this.suppressNextClick = false;

      if (this.clickResetTimer) {
        clearTimeout(this.clickResetTimer);
        this.clickResetTimer = undefined;
      }

      return;

    }

    this.navigateService(service);

  }


  // =====================================
  // NAVEGACIÓN DEL SERVICIO
  // =====================================

  private navigateService(service: Service) {

    if (service.route) {

      this.router.navigateByUrl(service.route);

    } else {

      this.showToast(
        `${service.name} estará disponible pronto`
      );

    }

  }


  // =====================================
  // MOSTRAR MENSAJES
  // =====================================

  private async showToast(message: string) {

    const toast = await this.toastCtrl.create({

      message: message,
      duration: 1600,
      position: 'bottom',
      color: 'dark',

    });

    await toast.present();

  }


  // =====================================
  // LIMPIAR TEMPORIZADORES
  // =====================================

  ngOnDestroy() {

    this.cancelPress();

    if (this.clickResetTimer) {
      clearTimeout(this.clickResetTimer);
    }

  }

}
