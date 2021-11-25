const titleInput=document.querySelector('#title')
const disInput=document.querySelector('#dis')
const editTxt=document.querySelector('.edited')
const btnEdit=document.querySelector('#change')
const back=document.querySelector('.back')

const id=window.location.hash.substring(1)

let todo=getLocal()

let findId=todo.find((item)=>{
    return item.id===id
})
if(findId===undefined){
    location.assign('../index.html')
}

titleInput.value=findId.title
disInput.value=findId.dis
editTxt.textContent=editTime(findId.updated)


btnEdit.addEventListener('click',()=>{
    findId.title=titleInput.value
    findId.dis=disInput.value
    findId.updated=moment().valueOf()
    editTxt.textContent=editTime(findId.updated)
    saveLocal(todo)

    
})
back.addEventListener('click',()=>{
    location.replace('./index.html')
})

window.addEventListener('storage',(e)=>{
    if(e.key==='task'){
        todo=JSON.parse(e.newValue)

        findId=todo.find((item)=>{
            return item.id===id
        })
        if(findId===undefined){
            location.assign('./index.html')
        }
        titleInput.value=findId.title
disInput.value=findId.dis
editTxt.textContent=editTime(findId.updated)
    }
})
