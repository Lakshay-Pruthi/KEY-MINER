import { useContext, useEffect, useState } from "react";
import { MainContext } from "./Main";
import restore from '../assets/restore.png'
import Logo from "../components/Logo";

function Bin() {
    const [updateTrigger, setUpdateTrigger] = useState(false)
    const { contract, userAccount } = useContext(MainContext);
    const [data, setData] = useState([]);


    useEffect(() => {
        async function getUserData() {
            const res = await contract.methods.getBinData().call({
                from: userAccount
            });
            console.log(res);
            let Data = [];
            for (let i = 0; i < res.length; i++) {
                Data.push(
                    <li className="itemlist" key={i} >
                        {res[i][0].length != 0 ?
                            <h4>{res[i][0].toUpperCase().substring(0, 15) + (res[i][0].length > 15 ? '...' : '')}</h4>
                            :
                            <h4>EMPTY TITLE</h4>
                        }
                        <div>
                            <p>{res[i][3]}</p>
                            <img className="favImg" onClick={() => restoreItem(i)} src={restore} alt="" />
                        </div>
                    </li>
                )
            }
            setData(Data)
        }
        contract && userAccount && getUserData();
    }, [contract, userAccount, updateTrigger])

    async function restoreItem(index) {
        await contract.methods.restoreData(index).send({ from: userAccount })
        setUpdateTrigger(!updateTrigger)
    }



    return (
        <>
            <div className="sidebar" id='innerSidebar'>
                <ul>
                    <li className="itemlist">
                        <p>Restore items to see them</p>
                    </li>
                    {data}
                </ul>
            </div>
            <div id="innerContainer">
                <Logo />
            </div>

        </>
    )
}

export default Bin;