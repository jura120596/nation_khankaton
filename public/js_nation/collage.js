
function collage(id) {
    var collage = document.getElementById(id);
    var images = collage.getElementsByTagName('img');
    //Маленький набор опций: averageRowHeight - примерная высота строки; gap - отступы между картинками;
    var options = {averageRowHeight: 175, gap: 3};
    var widths = [], rows = [], rowNumber = 0, index = 0, k = 0;
    //Записываем в массив ширину каждой картинки при одинаковой высоте
    for(var i = 0; i < images.length; i++){
        widths.push(Math.round(parseInt(images[i].getAttribute('width')) / parseInt(images[i].getAttribute('height')) * options.averageRowHeight));
    }
    //Функция суммы элементов массива
    Array.prototype.sum = function(){
        return this.reduce( function(prev,current){ return  +current + prev; }, 0);
    }
    if (widths.sum() == Infinity) {
        console.log({'wid': widths, 'ima': images, 'sum': widths.sum()});
        return;
    }
    //Разбиение оизображений на строки обичным деление общей ширины всех картинок на ширину контейнера
    while(collage.clientWidth <= 0){
        console.log('wait');
    }
    while(rowNumber < Math.ceil(widths.sum() / collage.clientWidth)){
        rows[rowNumber] = [];
        //Как только общая ширина картинок превысила ширину контейнера переходим на следующую строку
        while(index < widths.length && rows[rowNumber].sum()+(rows[rowNumber].length * options.gap) < collage.clientWidth + options.gap){
            rows[rowNumber].push(widths[index]);
            index++;
            //Если на последнюю строку осталось одно изображение, то дописываем его в "предпоследнюю"
            if(index == widths.length - 1){
                rows[rowNumber].push(widths[index]);
                rowNumber++;
                break;
            }
        }
        rowNumber++;
        console.log(rowNumber + ' ' + collage.clientWidth + ' ' + widths.sum() + ' = ' + Math.ceil(widths.sum() / collage.clientWidth));
    }
    index = 0;
        console.log(rowNumber + 'ddd');
    //Непосредственно изменение масштаба картинок (пропорционально, без обрезания изображений)
    for(var i = 0; i < rows.length; i++){
        for(var j = 0; j < rows[i].length; j++){
            // Если ширина строки больше/меньше ширины контейнера - соответственно
            // уменьшаем/увеличиваем до ширины контейнера с учетем отступов между картинками
            k = (collage.clientWidth - ((rows[i].length - 1) * options.gap)) / rows[i].sum();
            images[index].style.width = rows[i][j] * k  + 'px';
            images[index].style.height = k * options.averageRowHeight + 'px';
            if(j < rows[i].length - 1) images[index].style.marginRight = options.gap + 'px';
            if(i < rows.length - 1) images[index].style.marginBottom = options.gap + 'px';
            index++;
        }
    }
}