import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Home } from './home/Home.jsx'
import { FourOhFour } from './FourOhFour'
import {Profile} from "./Profile.jsx";
import {Message} from "./Message.jsx";
import {ViewListing} from "./ViewListing";
import {Signup} from './Signup.jsx';
import {CreateListing} from './CreateListing'
import {Messaging} from "./Messaging";
import {MyListings} from "./MyListings";
import {Provider} from "react-redux";
import {Navigation} from "./shared/components/main-nav/MainNav.jsx";
import {library} from "@fortawesome/fontawesome-svg-core"
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";


export function App(props) {
    const { store } = props
    library.add(faEnvelope, faKey)
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
                    <Route path='/view-listing' element={<ViewListing />} />
                    <Route path='/my-listings' element={<MyListings />} />
                    <Route path='/create-listing' element={<CreateListing />} />

                </Routes>
            </BrowserRouter>
            </Provider>
        </>
    )
}