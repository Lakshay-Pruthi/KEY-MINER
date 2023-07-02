import { useContext, useEffect, useState } from "react";
import { MainContext } from "./Main";
import Form from "../components/form";
import FormED from "../components/FormED";
import favourites from '../assets/favouritesIcon.png'
import { useParams } from "react-router";
import Logo from "../components/Logo";
import favStar from '../assets/favStar.png'


function AllItems() {

    const { value } = useParams()
    const [data, setData] = useState([]);
    const [showAddBox, setShowAddBox] = useState(false);
    const [showDisplayBox, setShowDisplayBox] = useState(false);
    const [index, setIndex] = useState('');
    const { contract, userAccount } = useContext(MainContext);
    const [updateTrigger, setUpdateTrigger] = useState(false)

    async function addToFavourites(index) {
        await contract.methods.addOrRemoveFromFavourites(index).send({
            from: userAccount
        })
        setUpdateTrigger(!updateTrigger)
    }


    useEffect(() => {
        async function getUserData() {
            const res = await contract.methods.getData().call({
                from: userAccount
            });
            let Data = [];
            for (let i = 0; i < res.length; i++) {
                if (value == undefined || res[i][3] == value)
                    Data.push(
                        <li className="itemlist" key={i} onClick={() => showDetails(i)}>
                            {res[i][0].length != 0 ?
                                <h4>{res[i][0].toUpperCase().substring(0, 15) + (res[i][0].length > 15 ? '...' : '')}</h4>
                                :
                                <h4>EMPTY TITLE</h4>
                            }
                            <div>
                                <p>{res[i][3]}</p>
                                {res[i][4] ?
                                    <img className="favImg" onClick={() => addToFavourites(i)} src={favStar} alt="" />
                                    :
                                    <img className="favImg" onClick={() => addToFavourites(i)} src={favourites} alt="" />
                                }
                            </div>
                        </li>
                    )
            }
            setData(Data)
        }
        contract && userAccount && getUserData();
    }, [contract, userAccount, value, updateTrigger])


    function addNewItem() {
        setShowAddBox(true);
        setShowDisplayBox(false);

    }

    async function showDetails(index) {
        setIndex(index)
        setShowDisplayBox(true);
        setShowAddBox(false)
    }


    return (
        <>
            <div className="sidebar" id='innerSidebar'>
                <ul>
                    {data.length != 0 ? data : <li className='itemlist'><p>Uploaded items will be shown here</p></li>}
                </ul>
                <button onClick={addNewItem} id="addItem">+</button>
            </div >
            <div id="innerContainer">
                {showAddBox ?
                    <Form updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} />
                    :
                    ""
                }
                {showDisplayBox ?
                    <FormED index={index} updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} setShowDisplayBox={setShowDisplayBox} />
                    :
                    ""
                }
                {!showDisplayBox && !showAddBox ? <Logo /> : ""}
            </div>
        </>
    )
}

export default AllItems;