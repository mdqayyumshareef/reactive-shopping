import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { ShoppingService } from 'src/app/service/shopping.service';
import { LoadShoppingAction, ShoppingActionTypes, LoadShoppingSuccessAction, LoadShoppingFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction, DeleteItemFailureAction } from '../actions/shopping.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ShoppingEffects {

    @Effect() loadShopping$ = this.actions$
        .pipe(
            ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
            mergeMap(() => {
                return this.shoppingService.getShoppingItems()
                    .pipe(
                        map(data => new LoadShoppingSuccessAction(data)),
                        catchError(err => of(new LoadShoppingFailureAction(err)))
                    )
            })
        )

    @Effect() addShoppingItem$ = this.actions$
        .pipe(
            ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
            mergeMap((data) => {
                return this.shoppingService.addShoppingItem(data.payload)
                    .pipe(
                        map(() => new AddItemSuccessAction(data.payload)),
                        catchError(err => of(new AddItemFailureAction(err)))
                    )
            })
        )

    @Effect() deleteShoppingItem$ = this.actions$
        .pipe(
            ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
            mergeMap((data) => {
                return this.shoppingService.deleteShoppingItem(data.payload.id)
                    .pipe(
                        map(() => new DeleteItemSuccessAction({ id: data.payload.id })),
                        catchError(err => of(new DeleteItemFailureAction(err)))
                    )
            })
        )

    constructor(
        private actions$: Actions,
        private shoppingService: ShoppingService,
    ) { }
}