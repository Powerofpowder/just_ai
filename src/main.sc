require: slotfilling/slotFilling.sc
  module = sys.zb-common
require: scripts/functions.js

theme: /

    state: Начало
        q!: $regex</start>
        intent!: /сыграть
        intent!: /привет
        a: Привет! Предлагаю сыграть в игру "Быки и коровы". Я загадаю 4-значное число (цифры в нем не повторяются), а ты попробуешь угадать. Я подсчитаю, сколько в твоем числе быков и коров. КОРОВЫ - количество угаданных цифр тайного числа, которые стоят не на своем месте, а БЫКИ - сколько раз угаданная цифра стоит в нужном месте. Хочешь попробовать?
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
            $reactions.answer("Загадано {{$session.secret}}");
            $reactions.transition("/Проверка");
            
    state: Проверка
        intent!: /число
        script:
            # $reactions.answer($parseTree._number);
            if (isWrongLenght($parseTree._number)) {
                $reactions.answer("Число должно быть 4-значным. Попробуй еще.");
            } else if (hasRepeatedDigits($parseTree._number)) {
                $reactions.answer("Цифры в числе не должны повторяться");
            } else {
                $reactions.answer(countBullsCows($parseTree._number, $session.secret));
            }
        go: /Согласен 

            
    state: NoMatch
        event!: noMatch
        a: Я не понял. Вы сказали: {{$request.query}}