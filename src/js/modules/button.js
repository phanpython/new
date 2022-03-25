let table = document.getElementById('tableID');

let buttons = document.getElementById('buttonID');

buttons.addEventListener('click', () => {
    addRow();
})

function addRow() {
    let row = document.createElement('tr');
    let col1 = document.createElement('td');
    table.appendChild(row);
    row.appendChild(col1);
    col1.innerHTML = 'Column1';
    let col2 = document.createElement('td');
    row.appendChild(col2);
    col2.innerHTML = 'Column2';
    let col3 = document.createElement('td');
    row.appendChild(col3);
    col3.innerHTML = 'Column3';
    let col4 = document.createElement('td');
    row.appendChild(col4);
    col4.innerHTML = 'Column4';
}
