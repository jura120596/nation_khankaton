<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;


/**
 * Class MainBag
 * @package App\Models
 * @property String $size
 * @property $picture
 * @property String $cost
 * @property String $old_cost
 * @property String $name
 */
class MainBag extends Model
{
    protected $fillable = [
        'size',
        'cost',
        'name',
        'old_cost',
    ];
}
