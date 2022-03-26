import IMask from 'imask';
   
//Фиксирование данных строки таблицы
if(document.querySelector('.table-permission__row')) {
    let rowsTable = document.querySelectorAll('.table-permission__row');
    let colsTable = document.querySelectorAll('.table-permission__col');
    let activeRowTable = 'table-content__row_active';

    colsTable.forEach((e) => {
        e.addEventListener('click', () => {
            let idPermission = e.parentElement.lastElementChild.value;
            let inputsProcess = document.querySelectorAll('.row-id-process');

            if(document.querySelector('.table-content__row_active')) {
                rowsTable.forEach((e) => {
                    e.classList.remove(activeRowTable);
                });
            }

            inputsProcess.forEach((e) => {
                e.value = idPermission;
            });

            e.parentElement.classList.add(activeRowTable);
        });
    });
}


//Вставка новой строки в таблицу
if(document.querySelector('.button-add-row')) {
    let buttonAdd = document.querySelector('.button-add-row');
    let table = document.querySelector('.table-content');
    let countCols = document.querySelector('.table-content__row_head').children.length;
    let heads = document.querySelectorAll('.table-content__head');
    let names = getAttributeName(heads);
    let timePattern = '^([0-1][0-9]|2[0-4]):[0-5][0-9]$';
    let datePattern = '^(?:(?:31(\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$';

    buttonAdd.addEventListener('click', () => {
        let countRows = document.querySelectorAll('.table-content__row').length;

        addRow(countRows);   
    })

    function getAttributeName(tags) {
        let result = [];

        tags.forEach(e => {
            result.push(e.getAttribute('name')); 
        });

        return result;
    }

    function getRow() {
        let row = document.createElement('div');
        row.classList.add('table-content__row');
        row.classList.add('table-row');

        return row;
    }

    function getCols() {
        let result = [];

        for(let i = 0; i < countCols; i++) {
            let col = document.createElement('div');
            col.classList.add('table-content__col');
            col.classList.add('table-col');
            result.push(col)
        }

        return result
    }

    function setMask(input, names, i) {
        if(names[i] === 'date') {
            input.classList.add('date-mask');
            input.setAttribute('pattern', datePattern);
            input.classList.add('date');
        }

        if(names[i] === 'time-from') {
            input.classList.add('time-mask');
            input.classList.add('time-from');
            input.setAttribute('pattern', timePattern);
        }

        if(names[i] === 'time-to') {
            input.classList.add('time-mask');
            input.classList.add('time-to');
            input.setAttribute('pattern', timePattern);
        }
    }

    function getInputs(countRows) {
        let result = [];

        for(let i = 0; i < countCols; i++) {
            let input = document.createElement('input');
            let name = names[i] + '-' + countRows;
            input.classList.add('table-col__input');
            input.setAttribute('name', name);
            input.setAttribute('required', 'required');

            setMask(input, names, i);

            result.push(input);
        }

        return result
    }

    function addColsIntoRow(row, cols) {
        for(let i = 0; i < cols.length; i++) {
            row.appendChild(cols[i]);
        }
    }

    function addInputsIntoCols(cols, inputs) {
        for(let i = 0; i < cols.length; i++) {
            cols[i].appendChild(inputs[i]);
        }
    }

    function addRow(countRows) {
        let row = getRow();
        let cols = getCols();
        let inputs = getInputs(countRows);
       
        addColsIntoRow(row, cols);
        addInputsIntoCols(cols, inputs);

        table.appendChild(row);
        fixRow();

        if(document.querySelector('.date-mask')) {
            setMaskDate();
        }

        if(document.querySelector('.time-mask')) {
            setMaskTime();
        }
    }

//Фиксирование строки 
let delRow;
fixRow();

function fixRow() {
    let rowsTable = document.querySelectorAll('.table-row');
    let activeRowTable = 'table-content__row_active';
    
    rowsTable.forEach((e) => {
        e.addEventListener('click', () => {
            rowsTable.forEach((e) => {
                e.classList.remove(activeRowTable);  
            });

            e.classList.add(activeRowTable);  
            delRow = e;   
       });
    });

}

//Удаление строки
let delButton = document.querySelector('.button-del-row');

delButton.addEventListener('click', () => {
    if(delRow) {
        delRow.remove();
    }
});

//Сохранение дат
let saveButton = document.querySelector('.save-dates');
let submitSaveDates = document.querySelector('.submit-save-dates');

saveButton.addEventListener('click', () => {
    let timesFrom = document.querySelectorAll('.time-from');
    let timesTo = document.querySelectorAll('.time-to');
    let dates = document.querySelectorAll('.date');
    //  !checkDate(dates)
    if(checkTimes(timesFrom, timesTo) ) {
        submitSaveDates.click();
    }
});

function checkDate(dates) {
    let fl = true;
    let reg = '^([0-1][0-9]|2[0-4]):[0-5][0-9]$';
    console.log(dates.length)
    dates.forEach(e => {
        if(e.value.search(reg)) {
            fl = false;
        }
    });

    return fl;
}

//Проверка времени начала и окончания работ (нужно, чтобы время окончания было больше, чем время начала)
function checkTimes(timesFrom, timesTo) {
    let reg = '^([0-1][0-9]|2[0-4]):[0-5][0-9]$';
    let fl = false;

    timesFrom.forEach((e,i) => {
        if(timesFrom[i].value.search(reg) + 1 && timesTo[i].value.search(reg) + 1) {
            let objDateFrom = new Date();
            let objDateTo = new Date();
    
            objDateFrom.setHours(timesFrom[i].value.slice(0,2));
            objDateFrom.setMinutes(timesFrom[i].value.slice(3,5));
            objDateTo.setHours(timesTo[i].value.slice(0,2));
            objDateTo.setMinutes(timesTo[i].value.slice(3,5));
    
            if(objDateFrom < objDateTo) {
                fl = true;
            } else {
                timesFrom[i].classList.add('error-animation');
                timesTo[i].classList.add('error-animation');
            }
        } else {
            timesFrom[i].classList.add('error-animation');
            timesTo[i].classList.add('error-animation');
        }

        setTimeout(() => {
            if(document.querySelector('.error-animation')) {
                let errorAnimation = document.querySelectorAll('.error-animation');

                errorAnimation.forEach(e => {
                    e.classList.remove('error-animation');
                });
            }
        }, 1000);
    })

    return fl;
}

//Маска даты
if(document.querySelector('.date-mask')) {
    setMaskDate();
}

function setMaskDate() {
    let dates = document.querySelectorAll('.date-mask');
    let dateOptions = {
        mask: '00.00.0000',
        lazy: false
    };

    dates.forEach(e => {
        new IMask(e, dateOptions);
    });
}

//Маска даты
if(document.querySelector('.time-mask')) {
    setMaskTime();
}

function setMaskTime() {
    let dates = document.querySelectorAll('.time-mask');
    let dateOptions = {
        mask: '00:00',
        lazy: false
    };

    dates.forEach(e => {
        new IMask(e, dateOptions);
    });
}
}

/*----------------------------------------------------------------------*/

let saveButtonProtection = document.querySelector('.save-protection');
console.log('123');
let submitSaveProtection = document.querySelector('.submit-save-protections');


if(saveButtonProtection){
    saveButtonProtection.addEventListener('click', () => {
        let protections = document.querySelectorAll('.protection');
        let entrances = document.querySelectorAll('.entrance');
        let exits = document.querySelectorAll('.exit');
        let vtors = document.querySelectorAll('.vtor');

        if(checkEmptyProtection(protections) ) {
            submitSaveProtection.click();
        }
    });
}
function checkEmptyProtection(protections){
    let flag = false;

    protections.forEach((e,i) => {
        if(!(timesFrom[i].value)){
            console.log('Пусто');
        }
        else(
            console.log(timesFrom[i].value)
        )
    });    
}

