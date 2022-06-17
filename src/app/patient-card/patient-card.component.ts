import { Component, Input } from '@angular/core';

type StatusId = 'waiting_line' | 'waiting_doctor' | 'waiting_definition' | 'done';

const patientStatus = {
  'waiting_line': 'Esperando na Fila',
  'waiting_doctor': 'Aguardando Atendimento',
  'waiting_definition': 'Aguarda Definição',
  'done': 'Já atendido',
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

  @Input() description = 'lorem ipsum something something';

  @Input() selected = false;

  @Input() patientStatusId: StatusId = 'done';

  constructor() { }

  getPatientStatus() {
    return patientStatus[this.patientStatusId];
  }

  getStatusStyle() {
    return statusStyle[this.patientStatusId];
  }
}
