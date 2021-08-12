import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import searchPageReducer from "../../components/pages/SearchPage/reducer";
import ReduxThunk from 'redux-thunk';
// import reducer from ...

const initialState = {}

// noinspection JSUnresolvedVariable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers = composeEnhancers( applyMiddleware(ReduxThunk) )

export const configureStore = createStore(
    combineReducers(
        {
            searchPage: searchPageReducer ,
           // companyPage: companyPageReducer,
           // favoritesPage: favoritesPageReducer ,
        }
    ),
    initialState,
    enhancers )

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

    Module 7 - D4 Jobs Search Engine
    You are in charge of building a "Search Engine" for Job Posting.
    The application should have a search page where the user can set the position (or tech) and the location.

   *START FROM YESTERDAY'S WORK*
    It's time to split our single reducer into multiple ones and introduce redux-thunk in our app for performing asynchronous action dispatching.
    Create two separate reducers: one will continue to store our favourites, and the other will be dedicated to host the array coming from the jobs search results.
    To fill this portion of the redux store, move your fetch method into a thunk action creator like we did this morning for dispatching the right action just when the search results are fully loaded.
    Keep intact the rest of the functionalities, and if you didn't already, give the user the ability to remove a job from the favourites list.
*/


