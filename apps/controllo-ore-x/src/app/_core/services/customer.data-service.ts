import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CustomerCreateDto,
  CustomerReadDto,
  CustomerUpdateDto,
} from '@api-interfaces';
import { BaseDataService } from '@controllo-ore-x/rt-shared';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService extends BaseDataService<
  CustomerReadDto,
  CustomerCreateDto,
  CustomerUpdateDto
> {
  currentApiUri: string = environment.apiUri + '/customers';

  constructor(protected http: HttpClient) {
    super();
  }
}
