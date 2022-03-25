import { isMobile } from "./functions.js";

//Модальное окно регистрации о сайте
if(document.querySelector('.icon_reg_auth')) {
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
