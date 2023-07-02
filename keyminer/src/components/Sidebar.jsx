import { Link, NavLink } from 'react-router-dom'
import allItemsIcon from '../assets/allItemsIcon.png'
import binIcon from '../assets/binIcon.png'
import cardsIcon from '../assets/cardsIcon.png'
import favouritesIcon from '../assets/favouritesIcon.png'
import identityIcon from '../assets/identityIcon.png'
import notesIcon from '../assets/notesIcon.png'
import loginIcon from '../assets/loginIcon.png'

function Sidebar() {
    return (
        <>
            <div className='sidebar'>
                <Link to='AllItems'><img src={allItemsIcon} alt="" />All items</Link>
                <Link to='Favourites'><img src={favouritesIcon} alt="" />Favourites</Link>
                <Link to='Bin'><img src={binIcon} alt="" />Bin</Link>
                <div><hr /></div>
                <details open>
                    <summary>Types</summary>
                    <ul>
                        <NavLink to='AllItems/LOGIN'><img src={loginIcon} alt="" />Login</NavLink>
                        <hr />
                        <NavLink to='AllItems/CARD'><img src={cardsIcon} alt="" />Cards</NavLink>
                        <hr />
                        <NavLink to='AllItems/IDENTITY'><img src={identityIcon} alt="" />Identity</NavLink>
                        <hr />
                        <NavLink to='AllItems/NOTE'><img src={notesIcon} alt="" />Secure note</NavLink>
                        <hr />
                    </ul>
                </details>
            </div>
        </>
    )
}

export default Sidebar;