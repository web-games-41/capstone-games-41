import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Home } from './home/Home.jsx'
import { FourOhFour } from './FourOhFour'
import {Profile} from "./Profile.jsx";
import {Message} from "./messages/inbox/Message.jsx";
import {ViewListing} from "./viewlisting/ViewListing";
import {Signup} from './Signup.jsx';
import {CreateListing} from './CreateListing'
import {Messaging} from "./messages/messaging/Messaging.jsx";
import {MyListings} from "./mylistings/MyListings";
import {Provider} from "react-redux";
import {Navigation} from "./shared/components/main-nav/MainNav.jsx";
import {library} from "@fortawesome/fontawesome-svg-core"
import {faEnvelope, faKey, faAdd} from "@fortawesome/free-solid-svg-icons";
import {UpdateListing} from "./UpdateListing.jsx";
import {UpdateListingPage} from "./UpdateListingPage.jsx";


export function App(props) {
    const { store } = props
    library.add(faEnvelope, faKey, faAdd)
    return (
        <>
            <Provider store={store}>
            <BrowserRouter>
                <Navigation></Navigation>
                <Routes>
                    <Route path='/sign-up' element={<Signup />} />
                    <Route path='/' element={<Home />} />
                    <Route path={"*"} element={<FourOhFour />} />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path='/message' element={<Message />} />
                    <Route path='/convo' element={<Messaging />} />
                    <Route path='/view-listing/:listingId' element={<ViewListing />} listingId=":listingId" />
                    <Route path='/my-listings' element={<MyListings />} />
                    <Route path='/create-listing' element={<CreateListing />} />
                    <Route path='/update-listing/:listingId' element={<UpdateListingPage />} />

                </Routes>
            </BrowserRouter>
            </Provider>
        </>
    )
}