import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Home } from './Home.jsx'
import { FourOhFour } from './FourOhFour'

import {Profile} from "./Profile.jsx";
import {Navigation} from "./Navigation";
import {Message} from "./Message.jsx";
import {ViewListing} from "./ViewListing";
import {Signup} from './Signup.jsx';


export function App() {
    return (
        <>
            <BrowserRouter>
                <Navigation></Navigation>
                <Routes>
                    <Route path='/sign-up' element={<Signup />} />
                    <Route path='/' element={<Home />} />
                    <Route path={"*"} element={<FourOhFour />} />

                    <Route path={'/profile'} element={<Profile />} />
                    <Route path='/message' element={<Message />} />
                    <Route path='/view-listing' element={<ViewListing />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}