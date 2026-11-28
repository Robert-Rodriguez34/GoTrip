
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonMenuButton
} from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonMenuButton
  ]
})

export class BookingPage {
  origen = '';
  destino = '';
  paradas: string[] = [];

  tarifa = 150;
  tiempoEspera = 50;
  total = this.tarifa + this.tiempoEspera;
  metodoPago: 'Efectivo' | 'Tarjeta' = 'Efectivo';

  zoom = 1;
  private pointers = new Map<number, { x: number; y: number }>();
  private distanciaInicial = 0;
  private zoomInicial = 1;

  constructor(private router: Router) {}

  // Agregar una parada
  agregarParada(): void {
    if (this.paradas.length >= 3) {
      return;
    }

    this.paradas.push('');
  }

  // Actualizar una parada
  actualizarParada(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.paradas[index] = input.value;
  }

  // Eliminar una parada
  eliminarParada(index: number): void {
    this.paradas.splice(index, 1);
  }

  // Seleccionar método de pago
  seleccionarPago(metodo: 'Efectivo' | 'Tarjeta'): void {
    this.metodoPago = metodo;
  }

  iniciarZoom(event: PointerEvent): void {
    const elemento = event.currentTarget as HTMLElement;

    this.pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    try {
      elemento.setPointerCapture(event.pointerId);
    } catch {
    }

    if (this.pointers.size === 2) {
      const puntos = Array.from(this.pointers.values());

      this.distanciaInicial = this.calcularDistancia(
        puntos[0],
        puntos[1]
      );

      this.zoomInicial = this.zoom;
    }
  }

  // Mover los dedos para acercar o alejar
  moverZoom(event: PointerEvent): void {
    if (!this.pointers.has(event.pointerId)) {
      return;
    }

    this.pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    if (this.pointers.size < 2 || this.distanciaInicial === 0) {
      return;
    }

    const puntos = Array.from(this.pointers.values());

    const distanciaActual = this.calcularDistancia(
      puntos[0],
      puntos[1]
    );

    const factor = distanciaActual / this.distanciaInicial;

    this.zoom = Math.min(
      2.5,
      Math.max(1, this.zoomInicial * factor)
    );
  }

  finalizarZoom(event: PointerEvent): void {
    this.pointers.delete(event.pointerId);

    if (this.pointers.size < 2) {
      this.distanciaInicial = 0;
    }
  }

  // Calcular distancia entre dos dedos
  private calcularDistancia(
    punto1: { x: number; y: number },
    punto2: { x: number; y: number }
  ): number {
    const diferenciaX = punto2.x - punto1.x;
    const diferenciaY = punto2.y - punto1.y;

    return Math.sqrt(
      diferenciaX * diferenciaX +
      diferenciaY * diferenciaY
    );
  }

  // Restablecer zoom
  reiniciarZoom(): void {
    this.zoom = 1;
    this.distanciaInicial = 0;
  }

  // Confirmar viaje
  confirmarViaje(): void {
    if (!this.origen.trim()) {
      alert('Debes indicar el punto de partida.');
      return;
    }

    if (!this.destino.trim()) {
      alert('Debes indicar el destino del viaje.');
      return;
    }

    this.router.navigateByUrl('/confirmation');
  }

  // Cancelar solicitud
  cancelarViaje(): void {
    this.router.navigateByUrl('/services');
  }
}
