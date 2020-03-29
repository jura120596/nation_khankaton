<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class MainBagFeature
 * @package App\Models
 * @property String feature
 * @property int main_bag_id
 */
class MainBagFeature extends Model
{
    protected $fillable = [
        'feature',
        'main_bag_id',
    ];
}
