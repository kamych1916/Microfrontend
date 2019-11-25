import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class SessionStorageService {

    constructor(@Inject(SESSION_STORAGE) public storage: StorageService) {}

}