import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { PatientDetails } from './patient-details/patient-details.component';

interface PatientData {
  timestamp: Date;
  responsible_name: string;
  pacient_name: string;
  pacient_birthdate: Date;
  pacient_cns: string;
  pacient_undergoing_threatment: string;
  pacient_undergoing_medicine: string;
  has_chronic_disease: string;
  chronic_disease: string;
  pacient_problem: string;
  speciality_required: string;
  has_schedule: string;
  schedule_date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://localhost:4200/assets/data.json';

  constructor(private http:HttpClient) { }

  getData(): Observable<PatientData[]> {
    return this.http.get<PatientData[]>(this.url);
  }
}
