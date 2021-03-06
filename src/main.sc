require: slotfilling/slotFilling.sc
  module = sys.zb-common
require: scripts/functions.js

theme: /

    state: Начало
        q!: $regex</start>
        intent!: /сыграть
        intent!: /привет
        a: Привет! Предлагаю сыграть в игру "Быки и коровы". Я загадаю 4-значное число (цифры в нем не повторяются), а ты попробуешь угадать. Я подсчитаю, сколько в твоем числе быков и коров. КОРОВЫ - количество угаданных цифр тайного числа, которые стоят не на своем месте, а БЫКИ - сколько раз угаданная цифра стоит в нужном месте. У тебя будет 7 попыток. Хочешь попробовать?
        go!: /Согласен
        
    state: Согласен

            state: Да
                intent: /согласие
                go!: /Игра

            state: Нет
                intent: /несогласие
                a: Захочешь сыграть - просто скажи.
                
    state: Игра
        script:
            $session.secret = genetareNumber();
            $session.attempts = 7;
            # $reactions.answer("Загадано {{$session.secret}}");
            $reactions.transition("/Проверка");
            
    state: Проверка
        intent!: /число
        script:
            /* выполняем проверку:
            вызываем функции проверки длины и повтора цифр числа пользователя,
            если число в нужно формате -
            засчитываем попытку и вывызваем функцию подсчета быков и коров */
            if (isWrongLenght($parseTree._number)) {
                $reactions.answer("Число должно быть 4-значным. Попробуй еще.");
            } else if (hasRepeatedDigits($parseTree._number)) {
                $reactions.answer("Цифры в числе не должны повторяться");
            } else {
                // Попытка засчитывается, если число пользователя соответствует правилам (4-значное и 4 цифры)
                $session.attempts -= 1;
                if (($parseTree._number !== $session.secret) && ($session.attempts <= 0)) {
                    $reactions.answer("Увы, попытки кончились. Загаданное число - {{$session.secret}}. Хочешь попробовать еще?");
                } else {
                    $reactions.answer(countBullsCows($parseTree._number, $session.secret));
                }
            }
        go: /Согласен 

    state: giveUp
        intent!: /сдаюсь
        a: Жаль! Загаданное число - {{$session.secret}}. Хочешь попробовать еще?
        go: /Согласен
        
    state: NoMatch
        event!: noMatch
        a: Я не понял. Вы сказали: {{$request.query}}