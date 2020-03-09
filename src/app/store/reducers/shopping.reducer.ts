import { ShoppingItem } from "../models/shopping-item.model";
import { ShoppingActionTypes, ShoppingAction } from "../actions/shopping.action";

export interface ShoppingState {
    list: ShoppingItem[];
    loading: boolean;
    err: Error;
}

const initialState: ShoppingState = {
    list: [],
    loading: false,
    err: undefined
}

export function ShoppingReducer(state: ShoppingState = initialState, action: ShoppingAction) {
    switch (action.type) {
        case ShoppingActionTypes.LOAD_SHOPPING:
            return {
                ...state,
                loading: true
            }
        case ShoppingActionTypes.LOAD_SHOPPING_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false
            }

        case ShoppingActionTypes.LOAD_SHOPPING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case ShoppingActionTypes.ADD_ITEM:
            return {
                ...state,
                loading: true
            }
        case ShoppingActionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload],
                loading: false
            };
        case ShoppingActionTypes.ADD_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ShoppingActionTypes.DELETE_ITEM:
            return {
                ...state,
                loading: true
            };
        case ShoppingActionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload.id),
                loading: false
            }
        case ShoppingActionTypes.DELETE_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

