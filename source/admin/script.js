var gameCardDummy;

window.onload = function() {
    gameCardDummy = $('#dummy .game');

    $.get('getGameData.php', function(data) {
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            addGameCard(data[i]);
        }
    });

    // for (var i = 0; i < testData.length; i++) {
    //     addGameCard(testData[i]);
    // }
}

function addGameCard(data) {
    var gameElement = gameCardDummy.clone();

    let titleEditing = true;
    gameElement.find('#title').val(data.title);
    gameElement.find('.titleBtn').on('click', function() {
        if (titleEditing) {
            $(this).parent().find('#title').attr('disabled', true);
            $(this).text('Edit');
            titleEditing = false;
            $.post('update.php', {
                title: $(this).parent().find('#title').val(),
                description: $(this).parent().find('#description').val(),
                path: $(this).parent().find('.path').text()
            });
        } else {
            $(this).parent().find('#title').attr('disabled', false);
            $(this).text('Save');
            titleEditing = true;
        }
    });
    gameElement.find('.titleBtn').click();

    let descriptionEditing = true;
    gameElement.find('#description').val(data.description);
    gameElement.find('.descriptionBtn').on('click', function() {
        if (descriptionEditing) {
            $(this).parent().find('#description').attr('disabled', true);
            $(this).text('Edit');
            descriptionEditing = false;
            $.post('update.php', {
                title: $(this).parent().find('#title').val(),
                description: $(this).parent().find('#description').val(),
                path: $(this).parent().find('.path').text()
            });
        } else {
            $(this).parent().find('#description').attr('disabled', false);
            $(this).text('Save');
            descriptionEditing = true;
        }
    });
    gameElement.find('.descriptionBtn').click();

    gameElement.find('.path').text(data.path);

    $('.list').append(gameElement);
}