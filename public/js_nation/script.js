var reclame_id = 0;
var chemodan_color_picture = false;
var chemodan_color_picture_price = 0;
var chemodan_checked_size = '';
var simple_prices = [2200, 2400, 2800, 2900, 3000, 3100];
var picture_prices = [2500, 2700, 3100, 3300, 3350, 3500];
var weights = [2.4, 2.5, 3.6, 3.8, 3.9, 4.1];
var vacuums = [35, 50, 65, 80, 95, 110];
var sizes = ['54x35x21', '60x40x23', '66x42x26', '70x44x28', '76x49x30', '78x50x32'];

function reclame_change() {
    var size = '';
    var price;
    switch (reclame_id){
        case 0:
            reclame_id++;
            price = simple_prices[2] + ' РУБ';
            size = 'M';
            break;
        case 1:
            reclame_id++;
            price = simple_prices[0] + ' РУБ';
            size = 'S';
            break;
        case 2:
            reclame_id = 0;
            price = simple_prices[4] + ' РУБ';
            size = 'L';
            break;
        default:
            break;
    }
    $('#form-order-price').val(price);
    $('#form-order-size').val(size);
}
var order_open = false;
function order(id) {
    reclame_id = id;
    reclame_change();

}

function set_size(size) {
    var price = '';
    $('#bag-size').children().each(function (item, o, arr) {
        if (o.className.toString().toLowerCase().search("active") >= 0){
            $('#' + o.id).removeClass("active");
            // console.log('#' + o.id);
        }
        if (o.id.toString() == "size_" + size +""){
            $('#' + o.id).addClass("active")
        }
        // console.log(item)
    });
    var prices;
    if (!chemodan_color_picture){
        prices = simple_prices;
    }else{
        prices = picture_prices;
    }
    var info_id = 0;
    switch (size){
        case 's':
            price = prices[0];
            info_id = 0;
            break;
        case 'sp':
            price = prices[1];
            info_id = 1;
            break;
        case 'm':
            price = prices[2];
            info_id = 2;
            break;
        case 'mp':
            price = prices[3];
            info_id = 3;
            break;
        case 'l':
            price = prices[4];
            info_id = 4;
            break;
        case 'lp':
            price = prices[5];
            info_id = 5;
            break;
        default:
            price = 0;
            break;
    }
    chemodan_checked_size = size;
    $('#bagg_weight').html(weights[info_id] + ' кг');
    $('#bag_vacuum').html(vacuums[info_id] + ' л.');
    $('#bag_size').html(sizes[info_id] + ' см');
    $('#bag_price').html(prices[info_id]);
    $('#order_bag_size').val(size.toUpperCase());
}
$(document).ready(function () {
    $('#bag-color li').click(function (e) {
        $e = $(e.target);
        set_color($e, $e.attr('class') , $e.attr('data-color'));
    });
    $('.carousel-item').click(function (e) {
        $e = $(e.target);
        window.location = $e.attr('data-link');
    });
    $('.showable').click(function (e) {
        $e = $(e.target).closest('.showable');
        if ($e.css('max-height') !== 'none') {
            $e.css('max-height', 'none')
        } else {
            $e.css('max-height', '150px')
        }
    });


    $('.project-card').click(function (e) {
        $e = $(e.target).closest('.project-card');
        window.location = $e.attr('data-link');
    });
    $('#ch-color').children().each(function (item, o, arr) {
            // console.log(item + " ." + o.className);
            $(o).click(function () {
                set_ch_color(o, o.className, $(o).attr('data-color'));
            });
        // console.log($(o));
        }
    );
    $('#ch-size').children().each(function (item, o, arr) {
        $('#' + o.id).click(function () {
            set_ch_size(o, o.className, $('#' + o.id).attr('data-size'));
        });
    });
    if ($('#collage').length !== 0)
    collage('collage');
    if ($('#collage2').length !== 0)
    collage('collage2');

});


function set_color(o_active, class_name, data_color) {
    $('#bag-color').children().each(function (item, o, arr) {
        var x = o.className.toString().split(' ')[0];
        o.className = x;
    });
    $('#order_bag_color').val(data_color);
    $('#bag_main').attr("src", $(o_active).attr('data-main'));
    $('#bag_weight').attr("src", $(o_active).attr('data-w'));
    $('#bag_v').attr("src", $(o_active).attr('data-v'));
    o_active.className = class_name + ' active';
    var type = o_active.attr('data-picture');
    if (type != undefined &&  type == '1'){
        if(chemodan_checked_size != ''){
            switch (chemodan_checked_size){
                case 's':
                    chemodan_color_picture_price = picture_prices[0];
                    break;
                case 'sp':
                    chemodan_color_picture_price = picture_prices[1];
                    break;
                case 'm':
                    chemodan_color_picture_price = picture_prices[2];
                    break;
                case 'mp':
                    chemodan_color_picture_price = picture_prices[3];
                    break;
                case 'l':
                    chemodan_color_picture_price = picture_prices[4];
                    break;
                case 'lp':
                    chemodan_color_picture_price = picture_prices[5];
                    break;
            }

            $('#bag_price').html(chemodan_color_picture_price);

        }
            chemodan_color_picture = true;
    }else{
        chemodan_color_picture = false;
        set_size(chemodan_checked_size)
    }

}

function set_ch_color(o_active, class_name, data_color) {
    $('#ch-color').find('.active').removeClass('active');
    $('#order_ch_color').val(data_color);
    $('#cover_main').attr("src", $(o_active).find('img').attr('src'));
    $(o_active).addClass('active')
}

function set_ch_size(o_active, class_name, data_ch_size) {
    console.log(data_ch_size);
    $('#ch-size').children().each(function (item, o) {
        var x = o.className.toString().split(' ')[0];
        o.className = x;
    });
    o_active.className = class_name + ' active';
    $('#order_ch_size').val(data_ch_size.toUpperCase());
    var ch_price = 0;
    switch (data_ch_size){
        case 's':
            ch_price = 600;
            break;
        case 'm':
            ch_price = 650;
            break;
        case 'l':
            ch_price = 700;
            break;
    }
    $('#ch_price').html(ch_price);
}
