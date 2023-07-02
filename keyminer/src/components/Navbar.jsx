import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../Pages/Main";


function Navbar() {
    const { userAccount, connectToWallet } = useContext(MainContext);
    return (
        <>
            <nav>
                <Link to='/Key-Miner/'>
                    <div id='navBox12'>
                        <h2>KEY-MINER</h2>
                    </div>
                </Link>

                <div>
                    <button>Account : {userAccount} </button>
                    <button><Link to='About'>About</Link></button>
                    <button onClick={connectToWallet}>connect</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar;