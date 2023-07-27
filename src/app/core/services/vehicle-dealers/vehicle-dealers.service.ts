import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { VehicleDealer } from '@shared/models';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleDealersService {
  public readonly url: string = 'assets/data/vehicle-dealers.json';
  readonly vehicleDealersKey: string = 'vehicleDealers';

  constructor(private http: HttpClient) {}

  getAll(): Promise<VehicleDealer[]> {
    return firstValueFrom(this.http.get<VehicleDealer[]>(this.url));
  }
}
