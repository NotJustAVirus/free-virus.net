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
        gameElement.find('.title').text(testData[i].title);
        gameElement.find('.description').text(testData[i].description);
        gameElement.find('.path').text(testData[i].path);

        $('.list').append(gameElement);
    }
}