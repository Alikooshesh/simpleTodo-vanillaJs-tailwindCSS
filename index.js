const textInput = document.querySelectorAll("#text-input")
const todoListBox = document.querySelector("#todoList-box")
const modalWrapper = document.getElementById("modal-wrapper")
const editTextInput = document.getElementById("edit-text-input")

let data=[]

const addNewTodo = (todoText)=>{
    const newTodo = {
        id : Date.now(),
        text : todoText,
        isEditMode : false,
    }

    data.push(newTodo)
}

const removeTodo = (todoId)=>{
    data = data.filter(item => item.id !== todoId)
}

const editTodo = (todoId , newText)=>{
    const indexFinder = data.findIndex(item => item.id == todoId)

    if(indexFinder >= 0){
        data[indexFinder].text = newText
    }

}

const changeToEditMode = (todoId)=>{
    data = data.map(item => {
        if(item.id == todoId){
            return {
                id : item.id,
                text : item.text,
                isEditMode : true
            }
        }else{
            return {
                id : item.id,
                text : item.text,
                isEditMode : false
            }
        }
    })
}

const changeAllTodoToDefaultMode = ()=>{
    data = data.map(item => ({id : item.id , text : item.text , isEditMode : false}))
}

// dom

const todoBoxCreator = ()=>{
    let result = ''

    data.forEach(item =>{
        result = result + `
        <div class="todo-wrapper w-full p-[8px] bg-gray-200 flex items-center justify-between rounded-[4px]">
                <p class="w-full whitespace-nowrap overflow-hidden text-ellipsis">${item.text}</p>
                <div class="todoAction-wrapper hidden items-center gap-[8px]">
                    <button class="w-[16px] h-[16px]" onclick="editBtnClickHandler(${item.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-full h-full fill-black" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                    </button>
                    <button class="w-[16px] h-[16px]" onclick="removeBtnClickHandler(${item.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-full h-full fill-red-500" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                          </svg>
                    </button>
                </div>
            </div>
        `
    })

    todoListBox.innerHTML = result
}

const modalController = ()=>{
    const finder = data.find(item => item.isEditMode == true)

    console.log("modal controller")
 
    if(finder){
        modalWrapper.style.display = "flex"
    }else{
        modalWrapper.style.display = "none"
    }
}

const addBtnClickHandler = ()=>{
    addNewTodo(textInput[0].value)
    textInput[0].value = ""

    todoBoxCreator()
}

const removeBtnClickHandler = (todoId)=>{
    removeTodo(todoId)
    todoBoxCreator()
}

const editBtnClickHandler = (todoId)=>{
    changeToEditMode(todoId)
    modalController()

    editTextInput.value = data.find(item => item.id == todoId).text
}

const cancelEditClickHandler = ()=>{
    changeAllTodoToDefaultMode()
    modalController()
}

const submitEditClickHandler = ()=>{
    const finder = data.find(item=> item.isEditMode)

    console.log(finder)

    if(finder){
        editTodo(finder.id , editTextInput.value)
        changeAllTodoToDefaultMode()
        modalController()
        todoBoxCreator()
    }
}

todoBoxCreator()