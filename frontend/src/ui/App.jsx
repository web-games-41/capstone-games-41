import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Home } from './Home.jsx'
import { FourOhFour } from './FourOhFour'
import {Navigation} from "./Navigation";
import {Message} from "./Message.jsx";


export function App() {
    return (
        <>
            <BrowserRouter>
                <Navigation></Navigation>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path={"*"} element={<FourOhFour />} />
                    <Route path='/message' element={<Message />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}