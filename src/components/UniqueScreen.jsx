import { useState, useEffect } from 'react'

function UniqueScreen() {

    const [textHeader, setTextHeader] = useState("")
    const [textDesc, setTextDesc] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [notesArray, setNotesArray] = useState([])

    function SetCachedNotes() {
        const noteList = localStorage.getItem('noteList')
        let actualList 

        if(!noteList) {
            localStorage.setItem('noteList', [])
            actualList = []
        }else {
            actualList = JSON.parse(localStorage.getItem('noteList'))
        }

        setNotesArray(actualList)
    }

    function HandleCacheList(event) {

        event.preventDefault()
        CheckNote(textHeader, textDesc)
    }

    function CheckNote(textHeader, textDesc) {

        if(!textHeader || textHeader.trim() == "" || !textDesc || textDesc.trim() == "") {
            return setErrorMsg("Title and description must be filled!")
        }

        const note = {
            title: textHeader,
            desc: textDesc
        }

        setNotesArray(previous => [...previous, note])

        const noteToCache = []
        noteToCache.push(...notesArray, note)

        localStorage.setItem('noteList', JSON.stringify(noteToCache))

    }

    function DeleteNote(noteId) {

        const noteToDelete = noteId.split("/")
        const noteTitle = noteToDelete[0]
        const noteDesc = noteToDelete[1]

        notesArray.forEach((element, index) => {

            if(element.title == noteTitle && element.desc == noteDesc) {
                notesArray.splice(index, 1)
            }

        })
        
        localStorage.setItem('noteList', JSON.stringify(notesArray))
    }

    useEffect(() => {
        SetCachedNotes()
    }, [notesArray])

    return(
        <div>
            <form className="flex items-center flex-col mt-6 gap-6">

                <input type="text" name="textHeader" id="textHeader" placeholder="Title" onChange={(event) => setTextHeader(event.target.value)}
                className="w-1/5 placeholder:text-center h-10 bg-neutral-800 text-center"/>      

                <input type="text" name="textDesc" maxLength={60} id="textDesc" placeholder="Your thoughts" onChange={(event) => (setTextDesc(event.target.value), setErrorMsg(""))}
                className="w-3/5 placeholder:text-center h-20 bg-neutral-800 text-xl text-white"/>  

                <button 
                className="w-20 -mt-3 h-7 material-icons text-green-500 bg-neutral-800" onClick={(event) => HandleCacheList(event)}>add</button>

                {errorMsg != "" ? 
                <div>
                    <h1 className='text-red-600'>
                        {errorMsg}
                    </h1>
                </div> : null}

            </form>

           {/*  {notesArray ? 
            : null} */}

            {notesArray.map(element => (
                <div className='h-fit text-white flex flex-col gap-2 bg-slate-800 items-center justify-center w-5/6 mx-auto mt-4'>
                    
                    <h1 id={element.title + '/' + element.desc} className='text-white text-xl'>{element.title}</h1>
                    <h1 id={element.title + '/' + element.desc} className='text-white mt-3'>{element.desc}</h1>
                    <span id={element.title + '/' + element.desc} onClick={(event) => DeleteNote(event.target.id)} className='material-icons absolute right-28 text-red-600 hover:cursor-pointer'>delete</span>

                </div>
            ))}
            
        </div>
    )
}

export default UniqueScreen