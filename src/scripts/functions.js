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
    if (user_number.toString().length != 4) {
        return true;
    } else {
        return false;
    }
}

// function isRepeatedDigit(user_number) {
// // почему-то "new Set" не работает
//     var arr = user_number.toString().split('')
//     var mySet = new Set(arr)
//     return mySet.size !== arr.length;
// }

function isRepeatedDigit(user_number) {
    var str = user_number.toString()
    return str[0] == str[1] || str[0] == str[2] || str[0] == str[3] || str[0] == str[4] ||
    str[1] == str[2] || str[1] == str[3] || str[1] == str[4] ||
    str[2] == str[3] || str[2] == str[4] ||
    str[3] == str[4];
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

function getBullsCowsCount(user_number, secret_number) {
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
    var bulls = getBullsCowsCount(user_number, secret_number)[0];
    var cows = getBullsCowsCount(user_number, secret_number)[1];
    
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