// Get references to HTML elements
const form = document.getElementById('form');   // Reference to the form element
const input = document.getElementById('input'); // Reference to the input element
const todosUL = document.getElementById('todos'); // Reference to the <ul> where todos are displayed

// Retrieve todos from local storage
const todos = JSON.parse(localStorage.getItem('todos'));

// If there are todos in local storage, add them to the list
if (todos) {
    todos.forEach(todo => addTodo(todo));
}

// Add a submit event listener to the form
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    addTodo(); // Call the addTodo function to add the todo
});

// Function to add a todo
function addTodo(todo) {
    let todoText = input.value;

    // If a 'todo' object is provided, use its text value
    if (todo) {
        todoText = todo.text;
    }

    // Check if todoText is not empty
    if (todoText) {
        const todoEl = document.createElement('li'); // Create a new list item for the todo

        // If 'todo' is provided and it is marked as completed, add 'completed' class
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoText; // Set the text content of the list item

        // Add click event listener to toggle completed status
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS(); // Update local storage after the change
        });

        // Add context menu (right-click) event listener to remove the todo
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Prevent the default context menu
            todoEl.remove(); // Remove the list item from the display
            updateLS(); // Update local storage after the change
        });

        todosUL.appendChild(todoEl); // Add the list item to the <ul>

        input.value = ''; // Clear the input field

        updateLS(); // Update local storage after the change
    }
}

// Function to update local storage with the current todos
function updateLS() {
    todosEl = document.querySelectorAll('li'); // Select all list items

    const todos = [];

    // Iterate through each list item and add its text and completion status to 'todos' array
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos)); // Update local storage with the 'todos' array
}
