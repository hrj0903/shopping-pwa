// Fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

// Creates HTML element from given item
function createElement(item) {
  const li = document.createElement('li');
  li.setAttribute('data-type', item.type);
  li.setAttribute('data-color', item.color);
  const img = document.createElement('img');
  img.setAttribute('src', item.image);
  const span = document.createElement('span');
  span.innerText = `${item.gender}, ${item.size} size`;
  li.appendChild(img);
  li.appendChild(span);
  return li;
}

// Handle button click
function onButtonClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateItems(items, key, value);
}

// Make the items matching {key: value} invisible.
function updateItems(items, key, value) {
  items.forEach((item) => {
    console.log(item.dataset);
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

// Main
loadItems()
  .then((items) => {
    const elements = items.map(createElement);
    const ul = document.querySelector('ul');
    ul.append(...elements);
    const btn = document.querySelector('.buttons');
    btn.addEventListener('click', (event) => onButtonClick(event, elements));
  })
  .catch(console.log);
