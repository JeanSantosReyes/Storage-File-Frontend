import { NavLink } from "react-router-dom"

const Navbar: React.FC = () => {
    return (
        <header className="d-flex flex-column">

            <div className="d-flex justify-content-center">
                <img src='assets/img/logo.png' className='App-logo' alt='logo' />
            </div>

            <nav className='navbar navbar-expand-lg'>
                <div className='navbar-collapse justify-content-center'>
                    <div className='navbar-nav fs-5'>
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/list' className='nav-link'>List</NavLink>
                    </div>
                </div>
            </nav>

        </header >
    )
}

export default Navbar