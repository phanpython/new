import { isMobile } from "./functions.js";

//Модальное окно регистрации о сайте
if(document.querySelector('.window')) {
    const SPEED_ANIMATE = 500;
    const modal = document.querySelector('.window-authorization');
    const closeModal = document.querySelector('.window-authorization__clear');

    closeModal.addEventListener('click', () => {
        modal.classList.remove('open');
        modal.classList.add('hide');

        setTimeout(() => {
            modal.classList.remove('hide');
        }, SPEED_ANIMATE);
    });

    addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            if(modal.classList.contains('open')) {
                modal.classList.remove('open'); 
                modal.classList.add('hide');
            }

            setTimeout(() => {
                modal.classList.remove('hide');
            }, SPEED_ANIMATE);
        }
    });

    if(document.querySelector('.window-authorization__form-in')) {
        const auth = document.querySelector('.window-authorization__title-in');
        const reg = document.querySelector('.window-authorization__title-reg');
        const authForm = document.querySelector('.window-authorization__form-in');
        const regForm = document.querySelector('.window-authorization__form-reg');
        const buttonAuth = document.querySelector('.content__button-auth');
        const buttonReg = document.querySelector('.content__button-reg');
        const windowauthorization = document.querySelector('.window-authorization');
        const authorizationButton = document.querySelector('.icon_reg_auth');
    
        function toogleForms(form1, form2, title1, title2) {
            form1.classList.add('window-authorization__form_active');
            form2.classList.remove('window-authorization__form_active');
            title1.classList.add('window-authorization__title_active');
            title2.classList.remove('window-authorization__title_active');
        }

        authorizationButton.addEventListener('click', () => {
            modal.classList.add('open');
        });

        windowauthorization.addEventListener('click', (e) => {
            if(e.target.classList[0] === 'window') {
                modal.classList.remove('open');
                modal.classList.add('hide');
        
                setTimeout(() => {
                    modal.classList.remove('hide');
                }, SPEED_ANIMATE);
            }
        });
    
        buttonAuth.addEventListener('click', () => {
            toogleForms(authForm, regForm, auth, reg);

            modal.classList.add('open');
            modal.classList.remove('hide');
        });

        buttonReg.addEventListener('click', () => {
            toogleForms(regForm, authForm, reg, auth);

            modal.classList.add('open');
            modal.classList.remove('hide');
        });

        reg.addEventListener('click', () => {
            toogleForms(regForm, authForm, reg, auth);
        });
    
        auth.addEventListener('click', () => {
            toogleForms(authForm, regForm, auth, reg);
        });
    }
}

//Скрытие пароля
if(document.querySelector('.window-authorization__icon')) {
    if(document.querySelector('.window-authorization__icon')) {
        let blockPass = document.querySelectorAll('.window-authorization__password');
    
        blockPass.forEach( (pass, index) =>  {
            let icon = pass.lastElementChild;
            
            icon.addEventListener('click', () => {
                let inputPassword = document.querySelectorAll('.input-password')[index];
    
                if (inputPassword.getAttribute('type') == 'password') {
                    icon.classList.remove('icon-password');
                    icon.classList.add('icon-password-hidden');
                    inputPassword.setAttribute('type', 'text');
                } else {
                    icon.classList.remove('icon-password-hidden');
                    icon.classList.add('icon-password');
                    inputPassword.setAttribute('type', 'password');
                }
            });
        });
    }
    
    if(document.querySelectorAll('input').length > 0) {
        let inputs = []; 
    
        document.querySelectorAll('input').forEach(e => {
            inputs.push(e);
        });
        
        inputs = inputs.filter(e => e.type !== "submit");
        
        inputs.forEach(e => {
            if(e.value === '') {
                e.classList.add('valid');
            }
        
            e.addEventListener('input', () => {
                e.classList.remove('valid');
            });
        });
        
    }
}

//Выбор поля

if(document.querySelector(".custom-select")) {
    let x, i, j, l, ll, selElmnt, a, b, c;
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            let y, i, k, s, h, sl, yl, input;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;

                if(s.className === 'select-department') {
                    input = document.querySelector('.input-department');
                } else {
                    input = document.querySelector('.input-subdivision');
                }

                input.value = h.innerHTML;

                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
            }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
    }

    function closeAllSelect(elmnt) {
    let x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
        arrNo.push(i)
        } else {
        y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
        }
    }
    }

    document.addEventListener("click", closeAllSelect);
}


//Запрет отправки формы без выбранных select

if(document.querySelector('.window-authorization__form-reg')) {
    let form = document.querySelector('.window-authorization__form-reg');

    form.addEventListener('submit', function(event) {
        let inputDepartment = document.querySelector('.input-department');
        let inputSubdivision = document.querySelector('.input-subdivision');
        let selects = document.querySelectorAll('.select-selected')
        
        if(!inputDepartment.value || !inputSubdivision.value) {
            if(!inputDepartment.value && !inputSubdivision.value) {
                selects.forEach(e => {
                    e.classList.add('select-selected_active');

                    setTimeout(() => {
                        e.classList.remove('select-selected_active');
                    }, 1000);
                });           
            } else if (!inputDepartment.value) {
                selects[0].classList.add('select-selected_active');

                setTimeout(() => {
                    selects[0].classList.remove('select-selected_active');
                }, 1000);
            } else {
                selects[1].classList.add('select-selected_active');

                setTimeout(() => {
                    selects[1].classList.remove('select-selected_active');
                }, 1000);
            }  

            event.preventDefault();  
        } 
    });
}


//Оповещение об успешной подачи заявки на регистрацию

if(document.querySelector('.content__ad')) {
    if(document.querySelector('.content__ad').value) {
        const SPEED_ANIMATE = 500;
        const modal = document.querySelector('.window-ad');
        const closeModal = document.querySelector('.window-ad__clear');
        const button = document.querySelector('.window-ad__button');
    
        modal.classList.add('open');
    
        closeModal.addEventListener('click', () => {
            modal.classList.remove('open');
            modal.classList.add('hide');
    
            setTimeout(() => {
                modal.classList.remove('hide');
            }, SPEED_ANIMATE);
        });
    
        button.addEventListener('click', () => {
            modal.classList.remove('open');
            modal.classList.add('hide');
    
            setTimeout(() => {
                modal.classList.remove('hide');
            }, SPEED_ANIMATE);
        });
    
    
        addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                if(modal.classList.contains('open')) {
                    modal.classList.remove('open'); 
                    modal.classList.add('hide');
                }
    
                setTimeout(() => {
                    modal.classList.remove('hide');
                }, SPEED_ANIMATE);
            }
        });
    }
}

//Отправка формы при нажатии на иконку поиска
if(document.querySelector('.icon-search')) {
    let iconSearch = document.querySelector('.icon-search');
    let formSearch = document.querySelector('.filter-content__search');

    iconSearch.addEventListener('click', () => {
        formSearch.submit();
    });
}

//Открытие формы фильтрации при нажатии на соответсвующую кнопку
if(document.querySelector('.filter')) {
    let submitFilter = document.querySelector('.filter');
    let blockFilter = document.querySelector('.filter-block');
    let closeFilter = document.querySelector('.close-filter');

    submitFilter.addEventListener('click', () => {
        blockFilter.classList.toggle('filter-block_active');
    });

    closeFilter.addEventListener('click', () => {
        blockFilter.classList.toggle('filter-block_active');
    });
}

// //Фиксирование данных строки таблицы
// if(document.querySelector('.table-permission__row')) {
//     let rowsTable = document.querySelectorAll('.table-permission__row');
//     let colsTable = document.querySelectorAll('.table-permission__col');
//     let activeRowTable = 'table-content__row_active';

//     colsTable.forEach((e) => {
//         e.addEventListener('click', () => {
//             let idPermission = e.parentElement.lastElementChild.value;
//             let inputsProcess = document.querySelectorAll('.row-id-process');

//             if(document.querySelector('.table-content__row_active')) {
//                 rowsTable.forEach((e) => {
//                     e.classList.remove(activeRowTable);
//                 });
//             }

//             inputsProcess.forEach((e) => {
//                 e.value = idPermission;
//             });

//             e.parentElement.classList.add(activeRowTable);
//         });
//     });
// }

//Отправка типов работ 
if(document.querySelector('.button-send-types-work')) {
    let buttonSendTypesWork = document.querySelector('.button-send-types-work');
    let formTypesWork = document.querySelector('.content__types-work');

    buttonSendTypesWork.addEventListener('click', () => {
        formTypesWork.submit();
    });
}

// //Вставка новой строки в таблицу
// if(document.querySelector('.button-add-row')) {
//     let buttonAdd = document.querySelector('.button-add-row');
//     let table = document.querySelector('.table-content');
//     let countCols = document.querySelector('.table-content__row_head').children.length;
//     let heads = document.querySelectorAll('.table-content__head');
//     let names = getAttributeName(heads);

//     buttonAdd.addEventListener('click', () => {
//         let countRows = document.querySelectorAll('.table-content__row').length;

//         addRow(countRows);   
//     })

//     function getAttributeName(tags) {
//         let result = [];

//         tags.forEach(e => {
//             result.push(e.getAttribute('name')); 
//         });

//         return result;
//     }

//     function getRow() {
//         let row = document.createElement('div');
//         row.classList.add('table-content__row');
//         row.classList.add('table-row');

//         return row;
//     }

//     function getCols() {
//         let result = [];

//         for(let i = 0; i < countCols; i++) {
//             let col = document.createElement('div');
//             col.classList.add('table-content__col');
//             col.classList.add('table-col');
//             result.push(col)
//         }

//         return result
//     }

//     function setMask(input, names, i) {
//         if(names[i] === 'date') {
//             input.classList.add('date-mask');
//         }

//         if(names[i] === 'time-from') {
//             input.classList.add('time-mask');
//         }

//         if(names[i] === 'time-to') {
//             input.classList.add('time-mask');
//         }
//     }

//     function getInputs(countRows) {
//         let result = [];

//         for(let i = 0; i < countCols; i++) {
//             let input = document.createElement('input');
//             let name = names[i] + '-' + countRows;
//             input.classList.add('table-col__input');
//             input.setAttribute('name', name);

//             setMask(input, names, i);

//             result.push(input);
//         }

//         return result
//     }

//     function addColsIntoRow(row, cols) {
//         for(let i = 0; i < cols.length; i++) {
//             row.appendChild(cols[i]);
//         }
//     }

//     function addInputsIntoCols(cols, inputs) {
//         for(let i = 0; i < cols.length; i++) {
//             cols[i].appendChild(inputs[i]);
//         }
//     }

//     function addRow(countRows) {
//         let row = getRow();
//         let cols = getCols();
//         let inputs = getInputs(countRows);
       
//         addColsIntoRow(row, cols);
//         addInputsIntoCols(cols, inputs);

//         table.appendChild(row);
//         fixRow();

//         if(document.querySelector('.date-mask')) {
//             setMaskDate();
//         }

//         if(document.querySelector('.time-mask')) {
//             setMaskTime();
//         }
//     }

// //Фиксирование строки 
// let delRow;
// fixRow();

// function fixRow() {
//     let rowsTable = document.querySelectorAll('.table-row');
//     let activeRowTable = 'table-content__row_active';
    
//     rowsTable.forEach((e) => {
//         e.addEventListener('click', () => {
//             rowsTable.forEach((e) => {
//                 e.classList.remove(activeRowTable);  
//             });

//             e.classList.add(activeRowTable);  
//             delRow = e;   
//        });
//     });

// }

// //Удаление строки
// let delButton = document.querySelector('.button-del-row');

// delButton.addEventListener('click', () => {
//     if(delRow) {
//         delRow.remove();
//     }
// });

// //Сохранение дат
// let saveButton = document.querySelector('.save-dates');
// let submitSaveDates = document.querySelector('.submit-save-dates');

// saveButton.addEventListener('click', () => {
//     let timeFrom = document.querySelectorAll('.time-mask')[0];
//     let timeTo = document.querySelectorAll('.time-mask')[1];

//     if(checkTimes(timeFrom, timeTo)) {
//         submitSaveDates.click();
//     }
// });

// function checkTimes(timeFrom, timeTo) {
//     let reg = '^([0-1][0-9]|2[0-4]):[0-5][0-9]$';

//     if(timeFrom.value.search(reg) + 1 && timeTo.value.search(reg) + 1) {
//         let objDateFrom = new Date();
//         let objDateTo = new Date();

//         objDateFrom.setHours(timeFrom.value.slice(0,2));
//         objDateFrom.setMinutes(timeFrom.value.slice(3,5));
//         objDateTo.setHours(timeTo.value.slice(0,2));
//         objDateTo.setMinutes(timeTo.value.slice(3,5));

//         if(objDateFrom < objDateTo) {
//             return true;
//         }
//     }

//     return false;
// }

// //Маска даты
// if(document.querySelector('.date-mask')) {
//     setMaskDate();
// }

// function setMaskDate() {
//     let dates = document.querySelectorAll('.date-mask');
//     let dateOptions = {
//         mask: '00.00.0000',
//         lazy: false
//     };

//     dates.forEach(e => {
//         new IMask(e, dateOptions);
//     });
// }

// //Маска даты
// if(document.querySelector('.time-mask')) {
//     setMaskTime();
// }

// function setMaskTime() {
//     let dates = document.querySelectorAll('.time-mask');
//     let dateOptions = {
//         mask: '00:00',
//         lazy: false
//     };

//     dates.forEach(e => {
//         new IMask(e, dateOptions);
//     });
// }
// }


