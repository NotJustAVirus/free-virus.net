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

    let titleEditing = false;
    gameElement.find('#title').val(data.title);
    gameElement.find('.titleBtn').on('click', function() {
        if (titleEditing) {
            $(this).parent().find('#title').attr('disabled', true);
            $(this).text('Edit');
            titleEditing = false;
            if (confirm('Are you sure you want to update this game?')) {
                $.post('update.php?type=update', {
                    title: $(this).parent().find('#title').val(),
                    description: $(this).parent().find('#description').val(),
                    path: $(this).parent().find('.path').text()
                });
            } else {
                $(this).parent().find('#title').val(data.title);
            }
        } else {
            $(this).parent().find('#title').attr('disabled', false);
            $(this).text('Save');
            titleEditing = true;
        }
    });

    let descriptionEditing = false;
    gameElement.find('#description').val(data.description);
    gameElement.find('.descriptionBtn').on('click', function() {
        if (descriptionEditing) {
            $(this).parent().find('#description').attr('disabled', true);
            $(this).text('Edit');
            descriptionEditing = false;
            if (confirm('Are you sure you want to update this game?')) {
                $.post('update.php?type=update', {
                    title: $(this).parent().find('#title').val(),
                    description: $(this).parent().find('#description').val(),
                    path: $(this).parent().find('.path').text()
                });
            } else {
                $(this).parent().find('#description').val(data.description);
            }
        } else {
            $(this).parent().find('#description').attr('disabled', false);
            $(this).text('Save');
            descriptionEditing = true;
        }
    });

    gameElement.find('.path').text(data.path);

    if (!data.inDatabase) {
        gameElement.find('.createBtn').text('Create');
        gameElement.find('.descriptionBtn').attr('disabled', true);
        gameElement.find('.titleBtn').attr('disabled', true);
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