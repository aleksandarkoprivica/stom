import { Injectable, ViewChild } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpClientModule
} from "@angular/common/http";
import { Termin } from "../models/Termin";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class TerminService {
  private readonly API_URL = environment.baseUrl + '/termin';
  dataChange: BehaviorSubject<Termin[]> = new BehaviorSubject<Termin[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllTermin(): Observable<Termin[]> {
    this.httpClient.get<Termin[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public getNextID(addTermin, termin: Termin, dialogRef): any {
    this.httpClient.get(this.API_URL + 'NextId').subscribe(
      data => {
        termin.id = data as number;
        this.addTermin(termin);
        dialogRef.close();
        return data as number;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  public addTermin(termin: Termin) {
    this.httpClient.post(this.API_URL, termin).subscribe(
      data => {
        console.log("Dodat novi termin!");
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  public deleteTermin(id: number): void {
    this.httpClient.delete(this.API_URL + '/' + id).subscribe(data => {
      console.log("Obrisano!");
    });
  }

  public updateTermin(termin: Termin): void {
    console.log("Update");

    this.httpClient.put(this.API_URL + '/' + `${termin.id}`, termin).subscribe(
      data => {
        console.log("Gotov update!");
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
}
