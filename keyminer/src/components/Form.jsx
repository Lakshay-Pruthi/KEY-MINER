import { useContext, useState } from "react";
import { MainContext } from "../Pages/Main";
function Form(props) {
    const { updateTrigger, setUpdateTrigger } = props
    const { contract, userAccount } = useContext(MainContext);
    const [text, setText] = useState('Add')

    async function uploadData(e) {
        e.preventDefault();
        setText('Adding...')
        const input = e.target;
        const title = input[0].value;
        const key = input[1].value;
        const value = input[2].value;
        let type;
        if (input[3].checked) type = 'LOGIN'
        if (input[4].checked) type = 'CARD'
        if (input[5].checked) type = 'IDENTITY'
        if (input[6].checked) type = 'NOTE'
        await contract.methods.uploadData(title, key, value, type).send({
            from: userAccount
        });
        setUpdateTrigger(!updateTrigger)
        setText('Add')
    }



    return (
        <>
            <form onSubmit={uploadData}>
                <input type="text" minlength='5' placeholder="ENTER THE TITLE eg Facebook" />
                <input type="text" minlength='5' placeholder="ENTER THE EMAIL / CARD / IDENTITY " />
                <input type="text" id="password" minlength='5' placeholder="ENTER THE PASSWORD / NOTE / PIN" />
                <div className="checkboxContainer">
                    <div className="checkboxInnerContainer">
                        <label htmlFor="">
                            <input type="radio" name="option" value='login' />
                            LOGIN
                        </label>
                    </div>
                    <div className="checkboxInnerContainer">
                        <label htmlFor="">
                            <input type="radio" name="option" value='card' />
                            CARD
                        </label>
                    </div>
                </div>
                <div className="checkboxContainer">
                    <div className="checkboxInnerContainer">
                        <label htmlFor="">
                            <input type="radio" name="option" id="" value='identity' />
                            IDENTITY
                        </label>
                    </div>
                    <div className="checkboxInnerContainer">
                        <label htmlFor="">
                            <input type="radio" name="option" id="" value='note' />
                            NOTE
                        </label>
                    </div>
                </div>
                <button id="addBtn" type="submit">{text}</button>
            </form>
        </>
    )
}

export default Form;