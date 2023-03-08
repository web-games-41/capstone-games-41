import React from "react"
import {Image} from "react-bootstrap";



export function Profile() {
    return (
        <>
            <h1>Profile</h1>

            <section id="avatarImg" className="bg-light container border rounded">
                <Image fluid className="" src="https://thumbs.dreamstime.com/b/generic-person-gray-photo-placeholder-man-silhouette-white-background-144511705.jpg" alt="Generic Avatar"/>

            </section>

                <form action="" method="" className="text-center">
                    <div className="">
                        <label htmlFor="firstName"></label>
                        <input type="text" name="firstName" id="firstName" required placeholder="First Name" size="18" />


                        <label htmlFor="Lastname"></label>
                        <input type="text" name="LastName" id="LastName" required placeholder="Last Name" size="18" />
                    </div>
                    <div className="">
                        <label htmlFor="email"></label>
                        <input type="email" name="email" id="email" required placeholder="Email" size="42" />
                    </div>
                    <div className="text-center">
                        <input type="submit" value="Update" />
                    </div>
                </form>


        </>

    )
}





