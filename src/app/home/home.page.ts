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
  IonCardContent,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  notificationsOutline,
  searchOutline,
  calendarOutline,
  addOutline,
  timeOutline,
  refreshOutline,
  trashOutline,
} from 'ionicons/icons';

interface Trip {
  id: number;
  title: string;
  address: string;
  date: string;
}

interface Category {
  name: string;
  img: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
    IonCardContent,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
  ],
})
export class HomePage {
  categories: Category[] = [
    { name: 'Viaje', img: 'assets/img/carro.png' },
    { name: 'Moto', img: 'assets/img/moto.png' },
    { name: 'Encargos', img: 'assets/img/encargo.png' },
  ];

  // Datos de ejemplo. Al hacer pull-to-refresh se restauran.
  private readonly baseTrips: Trip[] = [
    {
      id: 1,
      title: 'Universidad Abierta para Adultos',
      address: 'Av. Hispanoamericana #3843',
      date: 'NOV 4',
    },
    {
      id: 2,
      title: 'Centro Médico Cibao (UTESA)',
      address: 'Av. Juan Pablo Duarte #3',
      date: 'OCT 9',
    },
    {
      id: 3,
      title: 'Plaza Internacional',
      address: 'Av. Estrella Sadhalá',
      date: 'SEP 21',
    },
  ];

  trips: Trip[] = [...this.baseTrips];
  private pressTimer?: ReturnType<typeof setTimeout>;
  private startX = 0;
  private startY = 0;
  private readonly LONG_PRESS_MS = 600;
  private readonly MOVE_TOLERANCE = 10;

  constructor(
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController
  ) {
    addIcons({
      notificationsOutline,
      searchOutline,
      calendarOutline,
      addOutline,
      timeOutline,
      refreshOutline,
      trashOutline,
    });
  }

  //Pull-to-refres
  handleRefresh(event: CustomEvent) {
    setTimeout(async () => {
      this.trips = [...this.baseTrips];
      (event.target as HTMLIonRefresherElement).complete();
      await this.showToast('Viajes actualizados');
    }, 1200);
  }

  //Swipe para eliminar 
  async eliminar(trip: Trip, sliding: IonItemSliding) {
    await sliding.close();
    this.trips = this.trips.filter((t) => t.id !== trip.id);
    await this.showToast('Viaje eliminado');
  }

  //Long-press con menú contextual
  startPress(ev: PointerEvent, trip: Trip) {
    this.startX = ev.clientX;
    this.startY = ev.clientY;
    this.cancelPress();
    this.pressTimer = setTimeout(() => this.openContextMenu(trip), this.LONG_PRESS_MS);
  }

  movePress(ev: PointerEvent) {
    const moved =
      Math.abs(ev.clientX - this.startX) > this.MOVE_TOLERANCE ||
      Math.abs(ev.clientY - this.startY) > this.MOVE_TOLERANCE;
    if (moved) {
      this.cancelPress();
    }
  }

  cancelPress() {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = undefined;
    }
  }

  private async openContextMenu(trip: Trip) {
    this.pressTimer = undefined;
    const sheet = await this.actionSheetCtrl.create({
      header: trip.title,
      subHeader: trip.address,
      buttons: [
        {
          text: 'Reagendar',
          icon: 'refresh-outline',
          handler: () => this.reagendar(trip),
        },
        {
          text: 'Eliminar',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.trips = this.trips.filter((t) => t.id !== trip.id);
            this.showToast('Viaje eliminado');
          },
        },
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  // ---------- Acciones de la pantalla ----------
  async reagendar(trip: Trip) {
    await this.showToast(`Reagendado: ${trip.title}`);
  }

  reservar() {
    this.router.navigateByUrl('/services');
  }

  verTodas() {
    this.router.navigateByUrl('/services');
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1600,
      position: 'bottom',
      color: 'dark',
    });
    await toast.present();
  }
}