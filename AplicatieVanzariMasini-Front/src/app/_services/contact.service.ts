import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../_models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendContactMessage(contactForm: Contact){
    return this.http.post(this.baseUrl + 'contact/SendContactMessage', contactForm);
  }

}
