function genetareNumber() {
    // генерируем число, в котором цифры не повторяются
    var array = [];
    while (array.length < 4) {
        var rand = Math.floor(Math.random() * 9) + 1;
        if (array.indexOf(rand) == -1) {
            array.push(rand);
        }
    }
    return array.join("");
}

function getBullsEnding (i) {
    switch (i) {
        case 0:
        return 'быков';
        case 1:
        return 'бык';
        default: return 'быка';
    }
}

function getCowsEnding (i) {
    switch (i) {
        case 0:
        return 'коров';
        case 1:
        return 'корова';
        default: return 'коровы';
    }
}

function getBullsCount(user_number, secret_number) {
    var bulls = 0;
    
    for (var i = 0; i < 4; i++) {
        if (secret_number.toString()[i] === user_number.toString()[i]) {
            bulls++;
        }
    }
    return bulls;
}

function getCowsCount(user_number, secret_number) {
    var cows = 0;
    
    for (var i = 0; i < 4; i++) {
        if (secret_number.toString().indexOf(user_number.toString()[i]) !== -1) {
            cows++;
        }
    }
    return cows;
}
    
function countBullsCows(user_number, secret_number) {
    //  $reactions.answer("Ваше число {{$parseTree._number}}");
    var bulls = getBullsCount(user_number, secret_number);
    var cows = getCowsCount(user_number, secret_number);
    
    var bullsEnding = getBullsEnding(bulls);
    var cowsEnding = getCowsEnding(cows);
    var answer = bulls + ' ' + bullsEnding + '/' + cows + ' ' + cowsEnding + '. ';
    
    if (bulls < 4) {
        answer += 'Попробуй еще раз, чтобы угадать число целиком.';
    } else {
        answer += 'Ты отгадал(а) число! Хочешь сыграть заново?';
    }
    return answer;
}