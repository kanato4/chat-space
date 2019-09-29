$(function(){

  function buildMessage(message){
    var img = message.image ? `<img src= ${message.image}` : "";
    var html =`<div class="message">
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
      $('.form__input-box').val('');
    })
    .fail(function(){
      alert("エラー");
    })
  })
});