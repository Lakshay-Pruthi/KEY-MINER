import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Web3 from 'web3';
import { useEffect, useState } from "react";
import App from "../artifacts/contracts/App.sol/App.json";
import { createContext } from "react";

export const MainContext = createContext();

function Main() {

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null)
    const [userAccount, setUserAccount] = useState('');

    function connectToWallet() {
        const provider = window.ethereum;
        if (provider) {
            setWeb3(new Web3(provider));
            window.ethereum.enable();
        }
    }

    if (window.ethereum) {

        ethereum.on("accountsChanged", () => {
            setUserAccount();
        });

        ethereum.on('chainChanged', (_chainId) => window.location.reload());
    }

    useEffect(() => {
        async function loadContract() {
            const contract = new web3.eth.Contract(App.abi, '0xcbac16cf9A8fBF2E582ce78f5D37aFE903D37d2e');
            console.log(contract.methods);
            setContract(contract);
        }
        web3 && loadContract();
    }, [web3])

    useEffect(() => {
        async function getUserDetails() {
            const _users = await web3.eth.getAccounts();
            console.log(_users);
            setUserAccount(_users[0].toLowerCase());
        }
        web3 && getUserDetails();
    }, [web3, userAccount]);


    return (
        <>
            <MainContext.Provider value={{ web3, setWeb3, contract, userAccount, connectToWallet }}>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <Outlet />
                </div>
            </MainContext.Provider>
        </>
    )
}

export default Main;