<?php

// header('Access-Control-Allow-Origin: *'); 
// CRM server conection data
define('CRM_HOST', 'dimadan.bitrix24.ru'); // your CRM domain name
define('CRM_PORT', '443'); // CRM server port
define('CRM_PATH', '/crm/configs/import/lead.php'); // CRM server REST service path

define('CHECHOL_S', '600');
define('CHECHOL_M', '650');
define('CHECHOL_L', '700');
define('CHEMODAN_S', '2500');
define('CHEMODAN_SP', '2700');
define('CHEMODAN_M', '3100');
define('CHEMODAN_MP', '3300');
define('CHEMODAN_L', '3350');

$color_picture = array('бабочка', 'париж', 'путешествие', 'самолет', 'дорожные знаки', 'история', 'чернобелая история');
$simple_prices = array(2200, 2400, 2800, 2900, 3000);
$picture_prices = array(2500, 2700, 3100, 3300, 3350);

// CRM server authorization data
//define('CRM_LOGIN', 'bitrix_lead@glfinance.ru'); // login of a CRM user able to manage leads
//define('CRM_PASSWORD', 'Passw0rd'); // password of a CRM user // password of a CRM user
define('CRM_LOGIN', '79061303222@mail.ru'); // login of a CRM user able to manage leads
define('CRM_PASSWORD', '99buturo'); // password of a CRM user // password of a CRM user
// OR you can send special authorization hash which is sent by server after first successful connection with login and password
//define('CRM_AUTH', 'e54ec19f0c5f092ea11145b80f465e1a'); // authorization hash

/********************************************************************************************/

// POST processing
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{

    $leadData = $_POST['params'];
    if ($leadData['Товар'] == "Чемодан"){
        switch (strtoupper($leadData['Размер'])) {
            case 'S':
                // $price = CHEMODAN_S;
                $i = 0;
                break;
            case 'SP':
                // $price = CHEMODAN_SP;
                $i = 1;
                break;
            case 'M':
                // $price = CHEMODAN_M;
                $i = 2;
                break;
            case 'MP':
                // $price = CHEMODAN_MP;
                $i = 3;
                break;
            case 'L':
                // $price = CHEMODAN_L;
                $i = 4;
                break;
        }
        $f  = in_array($leadData['Цвет'], $color_picture);
        if ($f) {
            $price = $picture_prices[$i];
        } else {
            $price = $simple_prices[$i];
        }
    }else{
        switch (strtoupper($leadData['Размер'])) {
            case 'S':
                $price = CHECHOL_S;
                break;
            case 'M':
                $price = CHECHOL_M;
                break;
            case 'L':
                $price = CHECHOL_L;
                break;
        }

    }
    //for mail
    $to = '79061303222@mail.ru';
    $subject = 'Заказ с сайта';
    $message = "";
    foreach ($leadData as $key =>$value) {
        $message .= $key . ": " . $value . ",\n";
    }
    var_dump($_POST['order-times']);
    foreach ($_POST['order-times'] as $val){
        $message .= "Удобное время: " . ($val == "am" ? "до 15:00" : "после 15:00") . ",\n";
    }
    mail($to, $subject, $message);
    // append authorization data
    // get lead data from the form
    $postData = array(
        'TITLE' => $leadData['Источник'],
        'UF_CRM_1507106405' => $leadData['Товар'].' (Цвет: '.$leadData['Цвет'].')',
		'PHONE_WORK' => $leadData['Телефон'],
        'NAME' => $leadData['Имя'],
        'UF_CRM_1507104233' => $leadData['Размер'],
        'UF_CRM_1507120780' => $price
    );
    if (defined('CRM_AUTH'))
    {
        $postData['AUTH'] = CRM_AUTH;
    }
    else
    {
        $postData['LOGIN'] = CRM_LOGIN;
        $postData['PASSWORD'] = CRM_PASSWORD;
    }

//     open socket to CRM
    $fp = fsockopen("ssl://".CRM_HOST, CRM_PORT, $errno, $errstr, 30);
    if ($fp)
    {
        // prepare POST data
        $strPostData = '';
        foreach ($postData as $key => $value)
            $strPostData .= ($strPostData == '' ? '' : '&').$key.'='.urlencode($value);

        // prepare POST headers
        $str = "POST ".CRM_PATH." HTTP/1.0\r\n";
        $str .= "Host: ".CRM_HOST."\r\n";
        $str .= "Content-Type: application/x-www-form-urlencoded\r\n";
        $str .= "Content-Length: ".strlen($strPostData)."\r\n";
        $str .= "Connection: close\r\n\r\n";

        $str .= $strPostData;

        // send POST to CRM
        fwrite($fp, $str);

        // get CRM headers
        $result = '';
        while (!feof($fp))
        {
            $result .= fgets($fp, 128);
        }
        fclose($fp);

        // cut response headers
        echo 'Connection Success! '.$errstr.' ('.$response.')'.$strPostData;
        $response = explode("\r\n\r\n", $result);

        $output = '<pre>'.print_r($response[1], 1).'</pre>';
    }
    else
    {
        echo 'Connection Failed! '.$errstr.' ('.$errno.')';
    }
}
else
{
    $output = '';
}

// HTML form
?>