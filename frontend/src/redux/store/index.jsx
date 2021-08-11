import {combineReducers, createStore} from 'redux'
// import reducer from ...

export const initialState = {
    searchPage: {
        searchResults: []
    }

}

export const configureStore = createStore(
    combineReducers(
        {
            searchPage: searchPageReducer ,
            companyPage: companyPageReducer,
            favoritesPage: favoritesPageReducer ,
        }
    ),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

/*
    Today's task is to add a Redux store to your project,
    and give the user the ability to set as "favourite" as many companies as he/she likes.
    This favourite companies list must be entirely saved in the redux store, and rendered in a separate page
    (create a route on /favourites, for example).
    Also link your company detail page on every entry in this favourites page,
    just like you did on the main results.

    // EXTRA
    - Allow the user to also remove a company from his/her favourites.
    - Handle every error that you can think of by using redux actions and reducers (eg. {type: "SET_ERROR", payload: "404"})
    and display it by reading the global state to inform the user.
 */