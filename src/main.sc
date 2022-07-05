require: slotfilling/slotFilling.sc
  module = sys.zb-common
theme: /

    state: Начало
        q!: $regex</start>
        intent!: /сыграть
        intent!: /привет
        a: Привет! Я загадал тайное 4-значное число. Цифры в этом числе не повторяются. Я подсчитаю сколько быков и коров в твоем числе. КОРОВЫ - количество угаданных цифр тайного число, а БЫКИ - сколько раз угаданная цифра стоит в нужном месте. Хочешь попробовать?
        go!: /Согласен
        
    state: Согласен

            state: Да
                intent: /согласие
                go!: /Игра

            state: Нет
                intent: /несогласие
                a: Захочешь сыграть - просто скажи.
                
    state: Игра
        # генерируем случайное число от 1000 до 10000 (невключительно)
        script:
            $session.secret = Math.floor(Math.random() * 9000) + 1000;
            $reactions.answer("Загадано {{$session.secret}}");
            $reactions.transition("/Проверка");
            
    state: Проверка
        intent!: /число
        script:
            var num = $parseTree._number;
            $reactions.answer("Ваше число {{$parseTree._number}}");
            $session.bulls = 0;
            $session.cows = 0;
            
            for (var i = 0; i < 4; i++) {
                if ($session.secret.toString().indexOf(num.toString()[i]) !== -1) {
                    $session.cows++;
                    }
                    if ($session.secret.toString()[i] === num.toString()[i]) {
                        $session.bulls++;
                    }
                }
            
            if ($session.bulls < 4) {
                $reactions.answer("Быков 🐂: {{$session.bulls}}. Коров 🐄: {{$session.cows}}.\nПопробуй еще раз, чтобы угадать число целиком.");
            }
            else {
                $reactions.answer("Быков 🐂: {{$session.bulls}}. Коров 🐄: {{$session.cows}}. Ты отгадал(а) число! Хочешь сыграть заново?");
            }
        go: /Согласен 

            
    state: NoMatch
        event!: noMatch
        a: Я не понял. Вы сказали: {{$request.query}}