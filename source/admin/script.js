var gameCardDummy;

var gameData = $.get('getGameData.php');

var gameFolders = $.get('getGameFolders.php');

window.onload = function() {
    gameCardDummy = $('#dummy .game');

    gameData.done(function(data) {
        data = JSON.parse(data);
        gameFolders.done(function(folders) {
            folders = JSON.parse(folders);
            for (let i = 0; i < data.length; i++) {
                if (folders.includes(data[i].path)) {
                    folders.splice(folders.indexOf(data[i].path), 1);
                    addGameCard(data[i]);
                }
            }
            for (let i = 0; i < folders.length; i++) {
                console.log(folders[i]);
            }
        });
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
                $.post('update.php', {
                    title: $(this).parent().find('#title').val(),
                    description: $(this).parent().find('#description').val(),
                    path: $(this).parent().find('.path').text()
                });
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
                $.post('update.php', {
                    title: $(this).parent().find('#title').val(),
                    description: $(this).parent().find('#description').val(),
                    path: $(this).parent().find('.path').text()
                });
            }
        } else {
            $(this).parent().find('#description').attr('disabled', false);
            $(this).text('Save');
            descriptionEditing = true;
        }
    });

    gameElement.find('.path').text(data.path);

    $('.list').append(gameElement);
}