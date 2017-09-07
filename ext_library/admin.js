function saveAdmin(){
    if ($("#video_name").val() != '') {
        video_path = document.getElementById("video_name").files[0].path;
    } else {
        video_path = '';
    }

    var messages = {items: []};
    $( ".messages" ).each(function( index ) {
        message_text = $( this ).find(".message_text").val();
        message_time = $( this ).find(".message_time").val();
        if ($( this ).find(".message_icon").val() != '') {
            message_icon = $(this).find(".message_icon")[0].files[0].path;
        } else {
            message_icon = $( this ).find(".message_icon_hidden").val();
        }

        messages.items.push({id: index, text: message_text, time: message_time, icon: message_icon});
    });


    save = {
        time_hours: $("#time_hours").val(),
        time_minutes: $("#time_minutes").val(),
        time_seconds: $("#time_seconds").val(),
        video_path: video_path,
        messages: messages,
    }

    storage.set('ununik_timer', save, function(error) {
        if (error) throw error;
    });
    return true;
}

$( "#save" ).click(function( event ) {
    if (!saveAdmin()) {
        event.preventDefault();
    };
});

storage.has('ununik_timer', function(error, hasKey) {
    if (error) throw error;

    if (!hasKey) {
        //create default settings
        settings = {
            time_hours: 9,
            time_minutes: 30,
            time_seconds: 0,
        };
        storage.set('ununik_timer', settings, function(error) {
            if (error) throw error;
        });
    }
});

$( document ).ready(function() {
    storage.get('ununik_timer', function(error, data) {
        if (error) throw error;
        
        $("#time_hours").val(data.time_hours);
        $("#time_minutes").val(data.time_minutes);
        $("#time_seconds").val(data.time_seconds);

        for (var i in data.messages.items) {
            html = "<div class='messages'>" +
                "<label>Text:</label><input type='text' class='message_text' value='"+data.messages.items[i].text+"'><br>" +
                "<label>Cas:</label><input type='number' min='1' class='message_time' value='"+data.messages.items[i].time+"'><br>" +
                "<label>Ikona:</label><input type='file' accept='.gif, .png, .jpg, .jpeg, .svg' class='message_icon'><input type='hidden' class='message_icon_hidden' value='"+data.messages.items[i].icon+"'><br>" +
                "<label>Aktualni ikona:</label><img src='"+data.messages.items[i].icon+"' class='current_icon'>" +
                "<div class='removeMessage' onclick='removeMessage(this)'></div>" +
                "</div>"
            $("#zpravy").append(html);
        }
    });
});
$( document ).ready(function() {
    $( "#addMessage" ).click(function( event ) {
        cas = 15;
        html = "<div class='messages'>" +
            "<label>Text:</label><input type='text' class='message_text'><br>" +
            "<label>Cas:</label><input type='number' min='1' class='message_time' value='"+cas+"'><br>" +
            "<label>Ikona:</label><input type='file' accept='.gif, .png, .jpg, .jpeg, .svg' class='message_icon'><input type='hidden' class='message_icon_hidden' value=''>" +
            "<div class='removeMessage' onclick='removeMessage(this)'></div>" +
            "</div>"
        $("#zpravy").append(html);
    });
})

