function saveAdmin(){
    return true;
}

$( "#save" ).click(function( event ) {
    if (!saveAdmin()) {
        event.preventDefault();
    };
});

storage.has('foobar', function(error, hasKey) {
    if (error) throw error;

    if (hasKey) {
        console.log('There is data stored as `foobar`');
    } else {
        console.log('There is no data stored as `foobar`');
    }
});