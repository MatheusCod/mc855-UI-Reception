import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  getPatientData(patientId: String) {
    /**
     * Retorna o status de um paciente pelo id dele, formato
     * {
     *   id: xyz,
     *   status: 'waiting_line' | 'waiting_doctor' | 'waiting_definition' | 'done',
     *   date: '',
     *   patient_name: ''
     * }
     */
      let patientStatus = {}
      return this.http.get(`https://pacient-api.herokuapp.com/pacient/${patientId}`)
      .subscribe(status => {
        patientStatus = status;
      });

      return patientStatus;
  }

  getAllPatientData() {
    /**
     * Retorna todas as consultas, das ultimas 24h
     * [ {
     *   id: xyz,
     *   status: 'waiting_line' | 'waiting_doctor' | 'waiting_definition' | 'done',
     *   date: '',
     *   patient_name: ''
     * }
     * ]
     */
      let patientStatus = {}
      return this.http.get(`https://pacient-api.herokuapp.com/pacient`)
      .subscribe(status => {
        patientStatus = status;
      });

      return patientStatus;
  }

  updatePatientStatus(status: string) {
    /**
     * Retorna o resultado de um update de status
     * {
     *   id: xyz,
     *   status: 'waiting_line' | 'waiting_doctor' | 'waiting_definition' | 'done',
     * }
     */
      let patientStatus = {}
      return this.http.post(`https://pacient-api.herokuapp.com/pacient`, {
        "status": status
      })
      .subscribe(status => {
        patientStatus = status;
      });

      return patientStatus;
  }
}
