const form = document.getElementById('item-form')
const input = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

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

// Add Event Listener on Form Submission
form.addEventListener('submit', addItem)