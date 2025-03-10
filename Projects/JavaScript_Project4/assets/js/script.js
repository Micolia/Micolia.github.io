const todos = [
    { id: 1, name: "Go to the gym", completed: false },
    { id: 2, name: "Read a book", completed: false },
    { id: 3, name: "Take a walk", completed: false },
    { id: 4, name: "Study the exam", completed: false },
];

let taskId = todos.length + 1; // Imposta il primo ID disponibile dopo gli iniziali

const addItem = document.querySelector('#todo-input');
const lista = document.querySelector('.mylist');
const addButton = document.querySelector('#add-button');
const total = document.querySelector('.totalenumber');
const done = document.querySelector('.donenumber');

// Funzione per aggiungere task
const addTask = () => {
    const taskName = addItem.value; // Prendi il valore dall'input
    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    // Crea un oggetto task
    const task = {
        id: taskId++,
        name: taskName,
        completed: false,
    };

    todos.push(task); // Aggiungi il task all'array
    renderTask(task); // Mostra il task nella lista
    updateSummary(); // Aggiorna i totali

    addItem.value = ""; // Pulisci l'input
};

// Funzione per mostrare task nella lista
const renderTask = (task) => {

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    // Aggiungi ID
    const taskIdElem = document.createElement('p');
    taskIdElem.classList.add('id');
    taskIdElem.textContent = `${task.id}`;
    taskDiv.appendChild(taskIdElem);

    // Aggiungi nome
    const taskNameElem = document.createElement('p');
    taskNameElem.classList.add('itemname');
    taskNameElem.textContent = task.name;
    taskNameElem.addEventListener('click', () => toggleTaskCompletion(task, taskNameElem));
    taskDiv.appendChild(taskNameElem);

    // Button rimozione
    const removeButton = document.createElement('button');
    removeButton.id = 'remove';
    removeButton.textContent = 'Delete';
    removeButton.addEventListener('click', () => removeTask(task.id, taskDiv));
    taskDiv.appendChild(removeButton);

    lista.appendChild(taskDiv); // Aggiungi il task alla lista
};

// Funzione per rigare/srigare un task
const toggleTaskCompletion = (task, taskNameElem) => {
    task.completed = !task.completed;
    taskNameElem.style.textDecoration = task.completed ? 'line-through' : 'none';
    taskNameElem.style.color = task.completed ? '#fffb00' : '#ffffff';
    updateSummary();
};

// Funzione per rimuovere un task
const removeTask = (taskId, taskDiv) => {
    const index = todos.findIndex((task) => task.id === taskId);
    if (index > -1) {
        todos.splice(index, 1);
    }

    lista.removeChild(taskDiv);
    updateSummary();
};

// Funzione per aggiornare i totali
const updateSummary = () => {
    total.textContent = todos.length;
    done.textContent = todos.filter((task) => task.completed).length;
};

// Funzione per inizializzare i task
const initializeTasks = () => {
    todos.forEach(task => {
        renderTask(task);
    });
};

// Inizializza i task iniziali
initializeTasks();

// Crea task on click "Add"
addButton.addEventListener('click', addTask);
