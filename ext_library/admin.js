function saveAdmin(){
    save = {
        time_hours: $("#time_hours").val(),
        time_minutes: $("#time_minutes").val(),
        time_seconds: $("#time_seconds").val(),
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
    });
});