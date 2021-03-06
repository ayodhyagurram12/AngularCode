import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { AccountApi } from '../../api/base';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { HeaderService } from '../../services/header.service';
import { TranslateService } from '@ngx-translate/core';
import { UrlService } from '../../services/url.service';

import { UserinfoService } from '../account/pages/page-login/userinfo.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    email$: Observable<string | null> = this.account.user$.pipe(map(x => x ? x.email : null));

    temp : string = 'Hello, ';

    departmentsLabel$: Observable<string>;

    constructor(
        private account: AccountApi,
        private translate: TranslateService,
        public wishlist: WishlistService,
        public cart: CartService,
        public header: HeaderService,
        public url: UrlService,
        public userInfoService: UserinfoService,
    ) { }

    ngOnInit(): void {
        this.departmentsLabel$ = this.header.desktopLayout$.pipe(
            switchMap(layout => this.translate.stream(
                layout === 'spaceship' ? 'BUTTON_DEPARTMENTS' : 'BUTTON_DEPARTMENTS_LONG',
            )),
        );

        if(this.userInfoService.user != null)  this.temp = this.temp + this.userInfoService.user.email;
    }

    updateUser()
    {
        if(this.userInfoService.user != null)  this.temp = this.temp + this.userInfoService.user.email;
    }
}
