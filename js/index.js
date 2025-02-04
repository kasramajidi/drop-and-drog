const listAll = document.querySelector(".list")
const divList = document.querySelectorAll(".list-div")
let draggedItem = null;

divList.forEach(item => {
    item.addEventListener("dragstart", (e) => {
        draggedItem = item;
        setTimeout(() => item.classList.add("dragging"), 0)
    })

    item.addEventListener("dragend", () => {
        draggedItem.classList.remove("dragging")
        draggedItem= null;
    })
});



function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".list-div:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


listAll.addEventListener("dragover", (e) => {
    e.preventDefault()
    const afterDiv = getDragAfterElement(listAll, e.clientY)

    if (afterDiv == null){
        listAll.classList.add(draggedItem)
    }else{
        listAll.insertBefore(draggedItem, afterDiv)
    }
})