var socket = io.connect()
    , $posts   = $('ul#posts')
    , $message = $('input#message')
    , name;
    
window.onload = function(){
  document.getElementById("message").style.display = "none";
  document.getElementById("send").style.display = "none";
}

function enter() {
  name = document.getElementById("name").value;
  console.log(name + "<-name");
  socket.emit('id', name);
  document.getElementById("name").style.display = "none";
  document.getElementById("enter").style.display = "none";
  document.getElementById("message").style.display = "block";
  document.getElementById("send").style.display = "block";
}

  socket.on('id', function(data) {
    var $li = $('<li>').text("new menber : " + data);
    $posts.prepend($li);
  });

  socket.on('msg', function(data) {
    console.log(data);
    var $li = $('<li>').text(data.post + ' @ ' + data.id);
        $('ul#msgLog').prepend($li);
  });

  function msgSend(){
    var message = {name:name, msg:document.getElementById("message").value}; 
    console.log(message);
    socket.emit('msg', message);
    document.getElementById("message").value = "";
  }
