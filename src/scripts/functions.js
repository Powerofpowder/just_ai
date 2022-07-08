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

function isWrongLenght(user_number) {
    // проверяем длину числа пользователя
    if (user_number.toString().length != 4) {
        return true;
    } else {
        return false;
    }
}

function hasRepeatedDigits(user_number) {
    // проверяем наличие повторяющихся цифр в числе пользователя
    var array = user_number.toString().split('')
    var valuesSoFar = [];
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        } else {
            valuesSoFar.push(value);
        }
    }
    return false;
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

function getBullsCowsNumber(user_number, secret_number) {
    var bulls = 0;
    var cows = 0;
    
    for (var i = 0; i < 4; i++) {
        if (secret_number.toString()[i] === user_number.toString()[i]) {
            bulls++;
        } else {
            if (secret_number.toString().indexOf(user_number.toString()[i]) !== -1) {
                cows++;
            }
        }
    }
    
    return [bulls, cows];
}

    
function countBullsCows(user_number, secret_number) {
    //  $reactions.answer("Ваше число {{$parseTree._number}}");
    var valuesList = getBullsCowsNumber(user_number, secret_number)
    var bulls = valuesList[0];
    var cows = valuesList[1];
    
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