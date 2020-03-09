import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app-state.model';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping-item.model';
import { AddItemAction, DeleteItemAction, LoadShoppingAction } from './store/actions/shopping.action';
import { v4 as uuid } from "uuid";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    shoppingItems$: Observable<ShoppingItem[]>;
    loading$: Observable<boolean>;
    error$: Observable<Error>;
    newShoppingItem: ShoppingItem = { id: '', name: '' };

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.shoppingItems$ = this.store.select(state => state.shopping.list);
        this.loading$ = this.store.select(state => state.shopping.loading);
        this.error$ = this.store.select(state => state.shopping.err);
        this.store.dispatch(new LoadShoppingAction());
    }

    addItem() {
        this.newShoppingItem.id = uuid();
        this.store.dispatch(new AddItemAction(this.newShoppingItem));
        this.newShoppingItem = { id: '', name: '' };
    }

    deleteItem(id: string) {
        this.store.dispatch(new DeleteItemAction({ id: id }));
    }
}