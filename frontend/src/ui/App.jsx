import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Home } from './Home.jsx'
import { FourOhFour } from './FourOhFour'
import {Navigation} from "./Navigation";
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
                </Routes>
            </BrowserRouter>
        </>
    )
}