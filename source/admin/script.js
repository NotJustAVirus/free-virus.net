window.onload = function() {
    var gameDummy = $('#dummy');
    const game = gameDummy.find('.game');

    var testData = [
        {
            title: 'Game 1',
            description: 'Description 1',
            path: 'game1'
        },
        {
            title: 'Game 2',
            description: 'Description 2',
            path: 'game2'
        },
        {
            title: 'Game 3',
            description: 'Description 3',
            path: 'game3'
        }
    ];

    for (var i = 0; i < testData.length; i++) {
        var gameElement = game.clone();

        let titleEditing = true;
        gameElement.find('#title').val(testData[i].title);
        gameElement.find('.titleBtn').on('click', function() {
            if (titleEditing) {
                $(this).parent().find('#title').attr('disabled', true);
                $(this).text('Edit');
                titleEditing = false;
            } else {
                $(this).parent().find('#title').attr('disabled', false);
                $(this).text('Save');
                $.post('update.php', {
                    title: $(this).parent().find('#title').val(),
                    description: $(this).parent().find('#description').val(),
                    path: $(this).parent().find('.path').text()
                });
                titleEditing = true;
            }
        });
        gameElement.find('.titleBtn').click();

        let descriptionEditing = true;
        gameElement.find('#description').val(testData[i].description);
        gameElement.find('.descriptionBtn').on('click', function() {
            if (descriptionEditing) {
                $(this).parent().find('#description').attr('disabled', true);
                $(this).text('Edit');
                descriptionEditing = false;
            } else {
                $(this).parent().find('#description').attr('disabled', false);
                $(this).text('Save');
                descriptionEditing = true;
            }
        });
        gameElement.find('.descriptionBtn').click();

        gameElement.find('.path').text(testData[i].path);

        $('.list').append(gameElement);
    }
}