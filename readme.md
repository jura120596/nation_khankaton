## Инструкция

Для работы с проектом необходимо выполнотить:
    
    #composer install
    #php artisan key:generate
    #php artisan storage:link
    

Добавить файл с имененм .env, который можно скопировать из файла .env.example

Изменить данные для подключения к БД

    #php artisan serve
    
    открыть в браузере сайт http://localhost:8000/nation
    заполнить сайт через админку по ссылке http://localhost:8000/nation/admin 
    и заполнить сайт данными с помощью ссылок в админке
