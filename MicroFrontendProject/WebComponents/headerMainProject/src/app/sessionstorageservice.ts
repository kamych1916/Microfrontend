import { Inject, Injectable, Injector } from '@angular/core';
import { SESSION_STORAGE, LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class SessionStorageService {

    constructor(@Inject(SESSION_STORAGE) public storage: StorageService, @Inject(LOCAL_STORAGE) public local_storage: StorageService) {}

}