import { NavLink } from "react-router-dom";


const NavBar = () => {
    return (
        <div>
            <ul className=" flex justify-center gap-12 p-6">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/signup">Sign-Up</NavLink>
            </ul>
            
        </div>
    );
};

export default NavBar;