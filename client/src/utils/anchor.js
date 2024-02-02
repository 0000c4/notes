 export default function anchor(lastLocation, currentLocation, active, callback) {//локация до перехода, локация после перехода, активность, калбек при возвращении назад
    let once = 1; //эта переменная нужна чтобы предотвратить повторное выполнение условия.... а почему оно происходит я не знаю
    if (active) { //добавляем якорь при открытии заметки
        window.location.href = currentLocation;

    }
    window.addEventListener('hashchange', (e) => { //если url изменился

        if (window.location.href[window.location.href.length - 1] == lastLocation[lastLocation.length-1] && active && once == 1) { //сравниваем последний символ текущего url с последним символом прошлого url....
            callback();
            once = 0;
            console.log('а в чем прикол')
        }
    })
}