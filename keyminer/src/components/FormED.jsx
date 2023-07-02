import { useContext, useEffect, useState } from 'react';
import bin from '../assets/binIcon.png'
import edit from '../assets/edit.png'
import cancel from '../assets/cancel.png'
import save from '../assets/save.png'
import { MainContext } from '../Pages/Main';

function FormED(props) {
    const { index, updateTrigger, setUpdateTrigger, setShowDisplayBox } = props;
    const { contract, userAccount } = useContext(MainContext)
    const [TITLE, setTITLE] = useState('')
    const [KEY, setKEY] = useState('')
    const [VALUE, setVALUE] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        async function showDetails() {
            setEditMode(false)
            const res = await contract.methods.Data(userAccount, index).call();
            setTITLE(res[0])
            setKEY(res[1])
            setVALUE(res[2])
        }
        contract && showDetails()
    }, [contract, index])


    async function deleteItem() {
        setDeleting(true)
        try {
            await contract.methods.deleteData(index).send({
                from: userAccount
            });
        } catch (error) {
            console.log(error);
        }
        setShowDisplayBox(false)
        setUpdateTrigger(!updateTrigger)
        setDeleting(false)
    }

    async function saveEditedDetail(e) {
        e.preventDefault();
        setSaving(true)
        const title = e.target[0].value;
        const key = e.target[1].value;
        const value = e.target[2].value;
        await contract.methods.editData(index, title, key, value).send({ from: userAccount })
        setUpdateTrigger(!updateTrigger)
        setEditMode(false)
        setSaving(false)
    }

    return (
        <>
            <form onSubmit={saveEditedDetail}>

                <input type="text" value={TITLE} readOnly={!editMode} onChange={(e) => setTITLE(e.target.value)} />
                <input type="text" value={KEY} readOnly={!editMode} onChange={(e) => setKEY(e.target.value)} />
                <input type="text" value={VALUE} readOnly={!editMode} onChange={(e) => setVALUE(e.target.value)} />

                <div id="EDBtn">
                    {!editMode ?
                        <>
                            <button id='delete' type='button' onClick={deleteItem}>
                                {deleting ? 'Deleting...'
                                    :
                                    <img src={bin} alt="" />
                                }
                            </button>
                            <button id='edit' type='button' onClick={() => setEditMode(true)}><img src={edit} alt="" /></button>
                        </>
                        :
                        <div >

                            <button id='delete' type='button' onClick={() => setEditMode(false)}><img src={cancel} alt="" /></button>
                            <button id='edit' type='submit'>{saving ? 'Saving...' : <img src={save} alt="" />}</button>
                        </div>

                    }
                </div>
            </form >
        </>
    )
}

export default FormED;