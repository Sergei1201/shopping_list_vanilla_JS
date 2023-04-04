const form = document.getElementById('item-form')
const input = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')
const items = itemList.querySelectorAll('li')
const itemsLI = document.querySelectorAll('li')


// Add Item
const addItem = (e) => {
    e.preventDefault()
    const newItem = input.value
    // Simple validation
    if (newItem === '') {
        alert('Add Item')
        return
    }
    // Create a new DOM element (li)
    const li = document.createElement('li')
    // Create a text node
    li.appendChild(document.createTextNode(newItem))
    
    // Create a button with certain classes
    const button = createButton('remove-item btn-link text-red')

    // Create an icon with certain classes
    const icon = createIcon('fa-solid fa-xmark')

    // Append the icon to the button
    button.appendChild(icon)

    // Append the button to the li
    li.appendChild(button)

    // Append the li to the ul
    itemList.appendChild(li)

    checkUI()

    // Clear Input
    input.value = ''

}

// Create Button With Classes
const createButton = (classes) => {
    // Create a button
    const button = document.createElement('button')
    // Add classes
    button.className = classes
    return button
}

// Create an Icon With Classes
const createIcon = (classes) => {
    // Create an icon
    const icon = document.createElement('i')
    // Add classes
    icon.className = classes
    return icon
}

const removeItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
             e.target.parentElement.parentElement.remove()
        }
    }
    checkUI()
}

const removeItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    checkUI()
}

// Filter Items
const filterItems = (e) => {
    const text = e.target.value.toLowerCase()
    // Get li elements and loop through them to find a match
    const items = itemList.querySelectorAll('li')
    items.forEach((item) => {
        const element = item.textContent
        if (element.toLowerCase().indexOf(text) !== -1) {
            // there's a match
            item.style.display = 'flex'
        } else {
            // there's no match
            item.style.display = 'none'
        } 
    })
}

// Check UI
const checkUI = () => {
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        filter.style.display = 'none'
        clearBtn.style.display = 'none'
    } else {
        filter.style.display = 'block'
        clearBtn.style.display = 'block'
    }
}


// Add Event Listener on Form Submission
form.addEventListener('submit', addItem)
// Add Event Listener on Remove Item
itemList.addEventListener('click', removeItem)
// Add Event Listener on Remove Items
clearBtn.addEventListener('click', removeItems)
// Add Event Listener on Filter Items
filter.addEventListener('keyup', filterItems)

checkUI()


