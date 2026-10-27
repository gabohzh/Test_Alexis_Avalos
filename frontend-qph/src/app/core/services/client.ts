import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../shared/models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {

  private readonly apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  create(Client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, Client);
  }

  update(id: number, Client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, Client);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}