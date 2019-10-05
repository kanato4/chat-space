$(function(){
  var search_list = $('#user-search-result');
  var selected_list = $('.chat-group-form__user');
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    search_list.append(html);
  }

  function appendList(user){
    var html = `<div class="chat-group-user clearfix">
                  <input name='group[user_ids][]' type='hidden' value="${$(user).attr('data-user-id')}">
                  <p class='chat-group-user__name'>${$(user).attr('data-user-name')}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    selected_list.append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      url: '/users',
      type: "GET",
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      if (input.length === 0){
        $('#user-search-result').empty();
      }
      else if (users.length !== 0){
        $('#user-search-result').empty();
        users.forEach(function(user){
          appendUser(user);
        });
        $(document).on('click', ".chat-group-user__btn--add", function(e){
          var user = e.target
          appendList(user);
          $(this).unwrap();
          $(this).prev().remove();
          $(this).remove();
        });
        $(document).on('click', ".chat-group-user__btn--remove.js-remove-btn", function(e){
          $(this).parent().remove();
        });
      }
      else{
        $('#user-search-result').empty();
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })

    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });
});