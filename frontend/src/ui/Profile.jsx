import React from "react"
import {Image} from "react-bootstrap";
import Avatar from "./img/avatar.jpg"



export function Profile() {
    return (
        <>
            <h1 className="mb-5">Profile</h1>
                <div className="ms-5 ps-4 ms-md-0 ps-md-0">
                <Image fluid className="rounded mb-5 mx-md-auto d-block" src={Avatar} alt="Generic Avatar"/>
                </div>
                <form action="" method="" className="text-center">
                    <div className="mb-4">
                        <label htmlFor="firstName"></label>
                        <input className={"me-5"} type="text" name="firstName" id="firstName" required placeholder="First Name" size="12" />


                        <label htmlFor="Lastname"></label>
                        <input type="text" name="LastName" id="LastName" required placeholder="Last Name" size="12" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email"></label>
                        <input type="email" name="email" id="email" required placeholder="Email" size="34" />
                    </div>
                    <div className="">
                        <input type="submit" value="Update" />
                    </div>
                </form>


        </>

    )
}





