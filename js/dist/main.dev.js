"use strict";

$(function () {
  $('#subscribe-btn').on('click', function () {
    var $form = $('#user-form');
    var formData = $form.serializeArray();

    if (isFormValid(formData)) {
      var userList = localStorage.userList;

      if (userList) {
        userList = JSON.parse(userList);
      } else {
        userList = [];
      }

      var user = {
        username: formData.find(function (row) {
          return row.name === 'username';
        }).value,
        email: formData.find(function (row) {
          return row.name === 'email';
        }).value //checkbox: formData.find((row) => row.name === 'checkbox').value,
        //offercycle: formData.find((row) => row.name === 'offercycle').value,

      };
      var userId = formData.find(function (row) {
        return row.name === 'user-id';
      }).value;

      if (userId) {
        userList[userId] = JSON.stringify(user);
      } else {
        userList.push(JSON.stringify(user));
      }

      localStorage.userList = JSON.stringify(userList);
      $('.overlay').show();
      console.log('can be saved');
    } else {
      console.log('form not valid');
    }

    renderTable();
  });
  $('.close-btn').click(function () {
    $('.overlay').hide();
    clearForm();
  });

  function clearForm() {
    var clear = document.getElementById('user-form').reset();
    renderTable();
  }

  function isFormValid(formData) {
    var isFormValid = true;
    var errorMsgBlocks = document.getElementsByClassName('error-msg');
    Object.values(errorMsgBlocks).forEach(function (block) {
      block.innerHTML = '';
    });
    var username = formData.find(function (row) {
      return row.name === 'username';
    }).value;
    console.log(username);

    if (username.length < 6) {
      var errorMsg = document.getElementsByClassName('error-msg user')[0];
      errorMsg.innerHTML = "Min 6 charcters for username";
      isFormValid = false;
    }

    var email = formData.find(function (row) {
      return row.name === 'email';
    }).value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      var _errorMsg = document.getElementsByClassName('error-msg mail')[0];
      _errorMsg.innerHTML = "Not a valid email";
      isFormValid = false;
    }

    return isFormValid;
    $('.overlay').show();
  }

  $(document).ready(function () {
    $('.toggle-btn').on('click', function () {
      $('.side-form').toggleClass('visible');
      $('.toggle-btn').toggleClass('visible');
    });
  });
  var elem = document.getElementById('offercycle'),
      checkBox = document.getElementById('checkbox');
  checkBox.checked = false;

  checkBox.onchange = function () {
    elem.style.display = this.checked ? 'block' : 'none';
  };

  checkBox.onchange();

  function renderTable() {
    var _this = this;

    var $tBody = $('#users-table').find('tbody');
    var usersList = localStorage.userList ? JSON.parse(localStorage.userList) : [];
    var $trExample = $('.tr-example');
    $tBody.html('');
    usersList.forEach(function (user, index) {
      var $newTr = $trExample.first().clone().show();
      user = JSON.parse(user);
      $newTr.find('.username').text(user.username);
      $newTr.find('.email').text(user.email);
      $newTr.find('.checkbox').text(user.checkbox);
      $newTr.find('.offercycle').text(user.offercycle);
      $newTr.find('.delete-btn').attr('user-id', index);
      $tBody.append($newTr);
    });
    $('table').find('.delete-btn').on('click', function () {
      var $this = $(_this);
      var userId = $this.data('index') || $this.closest('td').data('index');
      var userList = JSON.parse(localStorage.userList);
      userList.splice(userId, 1);
      localStorage.userList = JSON.stringify(userList);
      renderTable();
    });
  }

  renderTable();
});