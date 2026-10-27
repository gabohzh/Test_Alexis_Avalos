import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ClientService } from '../../../core/services/client';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ToastModule,
    CheckboxModule
  ],
  providers: [MessageService],
  templateUrl: './client-form.html',
  styleUrls: ['./client-form.scss']
})
export class ClientFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.minLength(10)]],
    activo: [true],
    fecharegistro: [new Date(), [Validators.required]]
  });

  isEdit = false;
  clientId?: number;
  loading = false;
  submitting = false;

  onChangeActivo(): void {
    if (this.form.get('activo')?.value) {
      this.form.get('activo')?.setValue(true);
    } else {
      this.form.get('activo')?.setValue(false);
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.clientId = Number(id);
      this.loadClient(this.clientId);
    }
  }

  private loadClient(id: number): void {
    this.loading = true;
    this.clientService.getById(id).subscribe({
      next: (client) => {
        this.form.patchValue(client);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el cliente'
        });
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const data = this.form.value as { nombre: string; email: string; telefono: string; activo: boolean; fecharegistro: Date };
    const request = this.isEdit
      ? this.clientService.update(this.clientId!, data)
      : this.clientService.create(data);

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: this.isEdit ? 'Cliente actualizado' : 'Cliente creado'
        });
        setTimeout(() => this.router.navigate(['/clients']), 1500);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.error ?? 'Error al guardar el cliente'
        });
        this.submitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }
}