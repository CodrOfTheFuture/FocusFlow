export default function ToDoCard(props) {
    const {children, handleDeleteToDo, index, handleEditToDo} = props
    return (
            <li className="todoItem">
                    {children}
                    <div className="actionsContainer">
                        
                        <button onClick={() => {
                            handleEditToDo(index)
                        }} className="editButton">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button onClick={() => {
                            handleDeleteToDo(index)
                        }} className="trashButton">
                            <i className="fa-solid fa-trash" ></i>
                        </button>
                        
                    </div>
            </li>
        )
}



