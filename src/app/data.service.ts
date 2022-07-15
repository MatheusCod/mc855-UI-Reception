import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { PatientDetails } from './patient-details/patient-details.component';
import { StatusId } from './patient-card/patient-card.component';

interface PatientData {
  name: string;
  date_created: Date;
  responsible_name: string;
  status: StatusId,
  id: string
  // pacient_name: string;
  // pacient_birthdate: Date;
  // pacient_cns: string;
  // pacient_undergoing_threatment: string;
  // pacient_undergoing_medicine: string;
  // has_chronic_disease: string;
  // chronic_disease: string;
  // pacient_problem: string;
  // speciality_required: string;
  // has_schedule: string;
  // schedule_date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://pacient-api.herokuapp.com/patients';

  constructor(private http:HttpClient) { }

  getData(): Observable<PatientData[]> {
    return this.http.get<PatientData[]>(this.url);
  }

  updateStatus(id: String, statusId: StatusId) {
    return this.http.post<{
      id: String
    }>('https://pacient-api.herokuapp.com/patient/update', {
        id: id,
        status: statusId.toString()
    });
  }
}
