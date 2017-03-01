import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {EmailRequest} from './email-request.interface';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailService {
  private readonly headers = new Headers({ 'Content-Type': 'application/json' });
  private readonly options = new RequestOptions({ headers: this.headers });
  private readonly mailGunApi = '/api/mail-gun-send-mail';
  private readonly sendGridApi = '/api/send-grid-send-mail';
  constructor(private http: Http) { }

  private sendEmailThroughMailGun(request: EmailRequest): Observable<any> {
    return this.http.post(this.mailGunApi, request, this.options)
      .map(response => response.json());
  }

  private sendEmailThroughSendGrid(request: EmailRequest): Observable<any> {
    return this.http.post(this.sendGridApi, request, this.options)
      .map(response => response.json());
  }

  send(request: EmailRequest) {
    return this.sendEmailThroughSendGrid(request)
      .catch(() => this.sendEmailThroughMailGun(request));
  }
}
