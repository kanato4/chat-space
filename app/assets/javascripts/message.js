$(document).on('turbolinks:load', function(){

  function buildMessage(message){
    var img = message.image ? `<img src= ${message.image}` : "";
    var html =`<div class="message" data-message-id="${message.id}">
                <div class="message__upper-info">
                  <div class="message__upper-info__talker">
                    ${message.user_name}
                  </div>
                  <div class="message__upper-info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message__text">
                  <p class="message__text__content">
                    ${message.content}
                  </p>
                  ${img}
                </div>
               </div>`
    return html;
  }

  function scroll(){
    $('.messages').animate({
      scrollTop: $('.messages')[0].scrollHeight
    });
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message)
      $('.messages').append(html);
      $('#new_message')[0].reset();
      scroll();
    })
    .fail(function(){
      alert("エラー");
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var href = 'api/messages#index {format: "json"}'
      var last_message_id = $('.message:last').data('message-id'); 
      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = "";
        messages.forEach(function(message){
          insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
        })
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    }
  };
  setInterval(reloadMessages, 5000);
});