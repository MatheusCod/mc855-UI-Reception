import { Component, Input } from '@angular/core';

export type StatusId = 'waiting_line' | 'waiting_doctor' | 'waiting_definition' | 'done';

export interface Patient {
  patientNumber: number;
  selected: boolean;
  patientStatusId: StatusId;
};

export const patientStatus = {
  'waiting_line': 'Esperando na Fila',
  'waiting_doctor': 'Aguardando Atendimento',
  'waiting_definition': 'Aguarda Definição',
  'done': 'Já atendido',
} as const;

export const invertedPatientStatus = {
  'Esperando na Fila': 'waiting_line',
  'Aguardando Atendimento': 'waiting_doctor',
  'Aguarda Definição': 'waiting_definition',
  'Já atendido': 'done',
} as const;

const statusStyle = {
  'waiting_line': { backgroundColor: '#FFFFFF' },
  'waiting_doctor': { backgroundColor: '#a1a1ff' },
  'waiting_definition': { backgroundColor: '#fffdba' },
  'done': { backgroundColor: '#d6d6d6' },
} as const;

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent {
  @Input() patientNumber = 999;

  @Input() selected = false;

  @Input() patientStatusId: StatusId = 'done';

  constructor() { }

  getPatientStatus() {
    return patientStatus[this.patientStatusId];
  }

  getStatusStyle() {
    return this.selected
      ? { backgroundColor: '#beffba' } // Green background
      : statusStyle[this.patientStatusId];
  }
}
