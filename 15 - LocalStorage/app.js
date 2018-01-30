const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = getItems('items') || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateItems(items, itemsList);
    saveItems('items', items);
    this.reset();
    console.log(item);
}

function saveItems(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

function getItems(key) {
    return JSON.parse(localStorage.getItem('items'));
}

function populateItems(items = [], itemsList) {
    itemsList.innerHTML = items.map((item, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked': ''} />
                <label for="item${i}">${item.text}</label>
            </li>
        `;
    }).join(''); 
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const element = e.target;
    const index = element.dataset.index;
    items[index].done = !items[index].done;
    saveItems('items', items);
    populateItems(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateItems(items, itemsList);