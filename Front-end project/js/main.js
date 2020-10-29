
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

        console.log(formData.find((row) => row.name === 'username'))

        const user = {
            username: formData.find((row) => row.name === 'username').value,
            email: formData.find((row) => row.name === 'email').value,
           // checkbox: formData.find((row) => row.name === 'checkbox').value,
            //offercycle: formData.find((row) => row.name === 'offercycle').value,
        };

        const userId = formData.find((row) => row.name === 'user-id').value;
        if (userId) {
            userList[userId] = JSON.stringify(user);
        } else {
            userList.push(JSON.stringify(user));
        }

        localStorage.userList = JSON.stringify(userList);
        renderTable();
            
        console.log('can be saved')
        } else {
           console.log('form not valid')
        }
        renderTable();
    })

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
    }

    $(document).ready(() => {
        $('.toggle-btn').on('click', () => {
            $('.side-form').toggleClass('visible')
            $('.toggle-btn').toggleClass('visible')
        })
    })

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
            $newTr.find('.edit-btn').attr('user-id', index);
            $newTr.find('.delete-btn').attr('user-id', index);
            $tBody.append ($newTr);
        }); 


        $('.delete-btn').on('click', () => {
            const userId = $(this).attr('user-id');
            const userList = JSON.parse(localStorage.userList);

            userList.splice(userId, 1);
             
            localStorage.userList = JSON.stringify(userList);


            renderTable();
        });
    }
    renderTable();
});
