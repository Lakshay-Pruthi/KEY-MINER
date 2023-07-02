import { useContext, useEffect, useState } from "react";
import { MainContext } from "./Main";
import favStar from '../assets/favStar.png'
import Logo from "../components/Logo";
import Form from "../components/form";
import FormED from "../components/FormED";

function Favourites() {

    const [updateTrigger, setUpdateTrigger] = useState(false)
    const { contract, userAccount } = useContext(MainContext);
    const [data, setData] = useState([]);
    const [showAddBox, setShowAddBox] = useState(false);
    const [showDisplayBox, setShowDisplayBox] = useState(false);
    const [index, setIndex] = useState('');


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
            console.log(res);
            let Data = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i][4]) {
                    Data.push(
                        <li className="itemlist" onClick={() => showDetails(i)} key={i} >
                            {res[i][0].length != 0 ?
                                <h4>{res[i][0].toUpperCase().substring(0, 15) + (res[i][0].length > 15 ? '...' : '')}</h4>
                                :
                                <h4>EMPTY TITLE</h4>
                            }
                            <div>
                                <p>{res[i][3]}</p>
                                <img className="favImg" onClick={() => addToFavourites(i)} src={favStar} alt="" />
                            </div>
                        </li>
                    )
                }
            }
            setData(Data)
        }
        contract && userAccount && getUserData();
    }, [contract, userAccount, updateTrigger])

    async function restoreItem(index) {
        await contract.methods.restoreData(index).send({ from: userAccount })
        setUpdateTrigger(!updateTrigger)
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

                    {data.length != 0 ? data :
                        <li className="itemlist">
                            <p>Favourite items will be shown here</p>
                        </li>
                    }
                </ul>
            </div>
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


export default Favourites;