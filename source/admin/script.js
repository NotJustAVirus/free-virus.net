var gameCardDummy;

var gameData = $.get('getGameData.php');

window.onload = function() {
    gameCardDummy = $('#dummy .game');

    gameData.done(function(data) {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            addGameCard(data[i]);
        }
    });
}

function addGameCard(data) {
    var gameElement = gameCardDummy.clone();

    let editing = false;
    gameElement.find('.path').text(data.path);
    gameElement.find('#title').val(data.title);
    gameElement.find('#description').val(data.description);
    gameElement.find('.gameicon').attr('src', "../games/" + data.path + "/icon.png");

    gameElement.find('.editBtn').on('click', function() {
        if (editing) {
            $(this).parent().find('#title').attr('disabled', true);
            $(this).parent().find('#description').attr('disabled', true);
            $(this).text('Edit');
            editing = false;
            if (confirm('Are you sure you want to update this game?')) {
                data.title = $(this).parent().find('#title').val();
                data.description = $(this).parent().find('#description').val();
                $.post('update.php?type=update', {
                    title: data.title,
                    description: data.description,
                    path: data.path
                });
            } else {
                $(this).parent().find('#title').val(data.title);
                $(this).parent().find('#description').val(data.description);
            }
        } else {
            $(this).parent().find('#title').attr('disabled', false);
            $(this).parent().find('#description').attr('disabled', false);
            $(this).text('Save');
            editing = true;
        }
    });


    if (!data.inDatabase) {
        gameElement.find('.createBtn').text('Create');
        gameElement.find('.editBtn').attr('disabled', true);
        gameElement.find('.createBtn').on('click', function() {
            if (confirm('Are you sure you want to create this game?')) {
                $.post('update.php?type=create', {
                    title: $(this).parent().find('#title').val(),
                    description: $(this).parent().find('#description').val(),
                    path: $(this).parent().find('.path').text()
                });
                window.location.reload();
            }
        });
    } else {
        gameElement.find('.createBtn').on('click', function() {
            if (confirm('Are you sure you want to delete this game?')) {
                $.post('update.php?type=delete', {
                    path: $(this).parent().find('.path').text()
                });
                window.location.reload();
            }
        });
    }

    $('.list').append(gameElement);
}