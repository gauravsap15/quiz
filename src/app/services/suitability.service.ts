import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SuitabilityService {
  constructor(private httpClient: HttpClient) { }
  private apiURL = 'http://localhost:5000/application';

  getAppData(applicationId: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/${applicationId}`);
  }

  callTimeApi(applicationId: string, payload: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${applicationId}`,payload);
  }

  callLiquidityApi(applicationId: string, payload: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${applicationId}`,payload);
  }

  callRiskApi(applicationId: string, payload: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiURL}/${applicationId}`,payload);
  }
}
