<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['DATA'])) {
    $data = $_POST['DATA'];


    ?>

    <link rel="stylesheet" href="css_nation/bootstrap.min.css"/>
    <style>
        .form-group {
            display: table-cell;
            padding: 0px 30px 10px 0;
        }
        body {
            padding-top: 40px;
        }
    </style>
    <body style="background: none">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card p-5">
                    <h2 style="text-transform: uppercase">Оформление заказа</h2>
                    <form  method="post" class="order">
                        <?php
                            echo "<input type='hidden' name='params[Товар]' value='" . $data['OBJECT'] . "'>";
                            echo "<input type='hidden' name='params[Источник]' value='" . $data['TITLE'] . "'>";
                            echo "<input type='hidden' name='params[Размер]' value='" . $data['SIZE'] . "'>";
                            if (isset($data['COLOR'])) {
                                echo "<input type='hidden' name='params[Цвет]' value='" . $data['COLOR'] . "'>";
                            } else {
                                echo "<input type='hidden' name='params[Цвет]' value='Акция'>";
                            }
                        ?>
                        <div class="form-group">
                            <label class="form-control-label required" for="name">Имя и фамилия:*</label>
                            <input type="text" name="params[Имя]" id="name" placeholder="Иван" required minlength="2"
                                   class="form-control"<?php
                                        if (isset($data['NAME'])) {
                                            echo " value='" . $data['NAME'] . "'";
                                        }
                                    ?>
                            >
                        </div>
                      <!--   <div class="form-group">
                            <label class="form-control-label required" for="surname">Фамилия:*</label>
                            <input type="text" name="params[Фамилия]" id="surname" placeholder="Иванов" required
                                   minlength="2"
                                   class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label required" for="lastname">Отчество:</label>
                            <input type="text" name="params[Отчество]" id="lastname" placeholder="Иванович"
                                   minlength="5"
                                   class="form-control">
                        </div> -->
                        <div class="form-group">
                            <label class="form-control-label required" for="tel">Телефон:*</label>
                            <input type="tel" name="params[Телефон]" id="tel" placeholder="Телефон" required
                                   class="form-control"<?php
                                    if (isset($data['PHONE_WORK'])) {
                                        echo " value='" . $data['PHONE_WORK'] . "'";
                                    }
                                    ?>
                            >
                        </div>
                        <h3>Адрес</h3>
                        <div class="form-group">
                            <label class="form-control-label required" for="city">Город, населенный пункт:*</label>
                            <input type="text" name="params[Город]" id="city" placeholder="Москва" required
                                   class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label required" for="street">Улица:*</label>
                            <input type="text" name="params[Улица]" id="street" placeholder="Ленина" required
                                   class="form-control">
                        </div>
                        <div class="form-inline">
                            <div class="form-group float-left mr-2" style="max-width: 60px">
                                <label class="form-control-label required" for="home">Дом:*</label>
                                <input type="number" name="params[Дом]" id="home" required class="form-control"
                                       style="max-width: 60px">
                            </div>
                            <div class="form-group float-left mr-2" style="max-width: 60px">
                                <label class="form-control-label required" for="home_part">Корпус:</label>
                                <input type="text" name="params[Корпус]" id="home_part" class="form-control"
                                       style="max-width: 60px">
                            </div>
                            <div class="form-group float-left" style="max-width: 60px">
                                <label class="form-control-label required" for="room">Квартира:</label>
                                <input type="number" name="params[Квартира]" id="room" class="form-control"
                                       style="max-width: 60px">
                            </div>
                        </div>
                        <h3>Удобное время доставки:</h3>
                        <div class="form-group">
                            <label class="form-control-label required" for="date">Дата:*</label>
                            <input type="date" name="params[Дата]" id="date" class="form-control" required
                                   style="max-width: 160px">
                        </div>
                        <fildset class="form-group">
                            <legend class="col-form-legend required">Время:*</legend>
                            <div id="order-time">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox"
                                               id="order-time-am"
                                               name="order-times[]"
                                               class="form-check-input" value="am"
                                               checked="checked"> До 15:00</label>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox"
                                               id="order-time-pm"
                                               name="order-times[]"
                                               class="form-check-input" value="pm" checked="checked"> После
                                        15:00</label>
                                </div>
                            </div>
                        </fildset>
                        <div>
                            <button type="submit" id="order-create" class="btn-secondary btn">
                                Заказать
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    </body>
    <?php
}

