var gameCardDummy;
var tagDummy;

var tagsData = $.get('getTagData.php');
var gameData = $.get('getGameData.php');

window.onload = async function() {
    gameCardDummy = $('#dummy .game');
    tagDummy = $('#dummy .tag');
    $('#dummy').remove();
    
    $('.popup').hide();
    $('.popup .close').on('click', function() {
        $('.popup').hide();
    });
    
    await gameData;
    await tagsData;
    gameData = JSON.parse(gameData.responseText);
    tagsData = JSON.parse(tagsData.responseText);

    for (let i = 0; i < gameData.length; i++) {
        addGameCard(gameData[i]);
    }

    for (let i = 0; i < tagsData.length; i++) {
        addTag(tagsData[i]);
    }


    $('.createTag').on('click', function() {
        var name = $('#tagName').val();
        var color = $('#tagColor').val();
        $.post('update.php?type=createTag', {
            name: name,
            color: color
        });
        window.location.reload();
    });
}

function addGameCard(data) {
    var gameElement = gameCardDummy.clone();

    let editing = false;
    gameElement.find('.path').text(data.path);
    gameElement.find('#title').val(data.title);
    gameElement.find('#description').val(data.description);
    gameElement.find('.gameicon').attr('src', "../games/" + data.path + "/icon.png");

    if (data.inDatabase) {
        for (let i = 0; i < data.tags.length; i++) {
            var tagData = tagsData.find(tag => tag.id == data.tags[i].tag_id);
            addTagToGame(tagData, gameElement);
        }
    }
    gameElement.find('.addTag').on('click', function() {
        var popup = $('.popup');
        popup.show();
        popup.find('.tagselect').empty();
        for (let i = 0; i < tagsData.length; i++) {
            if (data.tags.find(tag => tag.tag_id == tagsData[i].id)) {
                continue;
            }
            var tagElement = $('<option>');
            tagElement.text(tagsData[i].name);
            tagElement.attr('style', 'color: #' + tagsData[i].color);
            tagElement.attr('value', tagsData[i].id);
            popup.find('.tagselect').append(tagElement);
        }
        popup.find('.addTag').on('click', function() {
            $.post('update.php?type=addTagToGame', {
                tag: $(this).parent().find('.tagselect').val(),
                game: data.id
            });
            addTagToGame(tagsData.find(tag => tag.id == $(this).parent().find('.tagselect').val()), gameElement);
            popup.hide();
        });
    });

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

    $('#gameList').append(gameElement);
}

function addTag(tagData) {
    var tagElement = tagDummy.clone();

    tagElement.find('.name').text(tagData.name);
    tagElement.attr('style', 'color: #' + tagData.color);

    tagElement.find('.deleteBtn').on('click', function() {
        if (confirm('Are you sure you want to delete this tag?')) {
            $.post('update.php?type=deleteTag', {
                name: tagData.name
            });
            window.location.reload();
        }
    });

    $('#tagList').append(tagElement);
}

function addTagToGame(tagData, gameElement) {
    var tagElement = tagDummy.clone();

    tagElement.find('.name').text(tagData.name);
    tagElement.attr('style', 'color: #' + tagData.color);

    tagElement.find('.deleteBtn').on('click', function() {
        if (confirm('Are you sure you want to remove this tag from this game?')) {
            $.post('update.php?type=removeTagFromGame', {
                name: tagData.name,
                path: gameElement.find('.path').text()
            });
            tagElement.remove();
        }
    });

    gameElement.find('.tagList').prepend(tagElement);
}