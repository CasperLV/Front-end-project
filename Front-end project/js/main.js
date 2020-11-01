
$(function () {
    $('#subscribe-btn').on('click', () => {
        const $form = $('#user-form');
        const formData = $form.serializeArray();

        if (isFormValid(formData)) {
            let userList = localStorage.userList;
            if (userList) {
                userList = JSON.parse(userList);
            } else {
                userList = [];
            }


            const user = {
                username: formData.find((row) => row.name === 'username').value,
                email: formData.find((row) => row.name === 'email').value,
                //checkbox: formData.find((row) => row.name === 'checkbox').value,
                //offercycle: formData.find((row) => row.name === 'offercycle').value,
            };


            const userId = formData.find((row) => row.name === 'user-id').value;
            if (userId) {
                userList[userId] = JSON.stringify(user);
            } else {
                userList.push(JSON.stringify(user));
            }

            localStorage.userList = JSON.stringify(userList);
            $('.overlay').show();
            console.log('can be saved')
            } else {
            console.log('form not valid')
            }

        renderTable();

    })

            $('.close-btn').click(function () {
                $('.overlay').hide();
                clearForm();
            })

    function clearForm() {
        const clear = document.getElementById('user-form').reset();
        renderTable();
    }




    function isFormValid(formData) {
        let isFormValid = true;

        const errorMsgBlocks = document.getElementsByClassName('error-msg');

        Object.values(errorMsgBlocks).forEach((block) => {
            block.innerHTML = '';

        })

        const username = formData.find((row) => row.name === 'username').value;
        console.log(username);

        if (username.length < 6) {
            const errorMsg = document.getElementsByClassName('error-msg user')[0];
            errorMsg.innerHTML = "Min 6 charcters for username";

            isFormValid = false;
        }

        const email = formData.find((row) => row.name === 'email').value;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (!re.test(email)) {
            const errorMsg = document.getElementsByClassName('error-msg mail')[0];
            errorMsg.innerHTML = "Not a valid email";
            isFormValid = false;

        }

        return isFormValid;
        $('.overlay').show();
    }


    $(document).ready(() => {
        $('.toggle-btn').on('click', () => {
            $('.side-form').toggleClass('visible')
            $('.toggle-btn').toggleClass('visible')
        })
    })
    
    const elem = document.getElementById('offercycle'),
        checkBox = document.getElementById('checkbox');
    checkBox.checked = false;
    checkBox.onchange = function () {
        elem.style.display = this.checked ? 'block' : 'none';
    };
    checkBox.onchange();




    function renderTable() {
        const $tBody = $('#users-table').find('tbody');
        const usersList = localStorage.userList ? JSON.parse(localStorage.userList) : [];

        const $trExample = $('.tr-example');
        $tBody.html('');
        usersList.forEach(function (user, index) {
            const $newTr = $trExample.first().clone().show();
            user = JSON.parse(user);

            $newTr.find('.username').text(user.username);
            $newTr.find('.email').text(user.email);
            $newTr.find('.checkbox').text(user.checkbox);
            $newTr.find('.offercycle').text(user.offercycle);
            $newTr.find('.delete-btn').attr('user-id', index);
            $tBody.append($newTr);
        });


        $('table').find('.delete-btn').on('click', () => {
            const $this = $(this);
            const userId = $this.data('index') || $this.closest('td').data('index');
            const userList = JSON.parse(localStorage.userList);

            userList.splice(userId, 1);

            localStorage.userList = JSON.stringify(userList);

            renderTable();

        })

    }
    renderTable();
})



