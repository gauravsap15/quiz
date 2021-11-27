import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SuitabilityService {
  constructor(private httpClient: HttpClient) { }
  private apiURL = 'http://localhost:5000/application'

  getAppData(id:any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/${id}`)
  }

  callTimeApi(payload:any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${payload.applicationId}`, payload)
  }

  callLiquidityApi(payload:any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${payload.applicationId}`, payload);
  }

  callRiskApi(payload:any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${payload.applicationId}`, payload)
  }
}
