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

  callTimeApi(payload:any, applicationId:string): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${applicationId}`, payload);
  }

  callLiquidityApi(payload:any, applicationId:string): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${applicationId}`, payload);
  }

  callRiskApi(payload:any, applicationId:string): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${applicationId}`, payload);
  }
}
