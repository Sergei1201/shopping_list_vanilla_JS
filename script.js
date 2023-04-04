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

    // Add to Local Storage
    addItemToLocalStorage(newItem)

    checkUI()

    // Clear Input
    input.value = ''

}

// Add Item to LS
const addItemToLocalStorage = (item) => {
    let items
    // Check if LS is empty
    if (localStorage.getItem('items') === null) {
        // Set an empty array
        items = []
    } else {
        // Otherwise, pull out existing items from LS and put add them into an array
        items = JSON.parse(localStorage.getItem('items'))
    }  
    items.push(item)
    // Reset LS
    localStorage.setItem('items', JSON.stringify(items))
}

// Get Items from LS when the page is loaded
const getItemsFromLocalStorage = () => {
    let items
    // Check if LS is empty
    if (localStorage.getItem('items') === null) {
        // Set an empty array
        items = []
    } else {
        // Pull out the info from LS and add set it to an array
        items = JSON.parse(localStorage.getItem('items'))
    }

    // Loop through items and create elements for displaying on the page
    items.forEach((item) => {
        const li = document.createElement('li')
        // Create a text node and append to li
        li.appendChild(document.createTextNode(item))

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
        
        // Check UI
        checkUI()
    })
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
    // Remove Item from LS
    removeItemFromLocalStorage(e.target.parentElement.parentElement)
    checkUI()
}

// Remove Item From LS
const removeItemFromLocalStorage = (element) => {
    let items
    // Check if LS is empty
    if (localStorage.getItem('items') === null) {
        // Initialize an empty array
        items = []
    } else {
        // Pull out the info from LS and put it into an array
        items = JSON.parse(localStorage.getItem('items'))
    }
        items.forEach((item, index) => {
            if (item === element.textContent) {
                items.splice(index, 1)
            }
        })
        // Reset LS
        localStorage.setItem('items', JSON.stringify(items))
}

const removeItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    // Remove from LS
    removeAllFromLocalStorage()
    checkUI()
}

// Remove All Items From LS
const removeAllFromLocalStorage = () => {
    localStorage.clear()
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
// Get items from LS when the page has been loaded and display them
document.addEventListener('DOMContentLoaded', getItemsFromLocalStorage)

checkUI()


