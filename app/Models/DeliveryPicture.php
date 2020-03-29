<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

/**
 * Class DeliveryPicture
 * @package App\Models
 */
class DeliveryPicture extends Picture
{
    protected $table = 'pictures';

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('delivery', function (Builder $builder) {
            $builder->where('category', '=', 'delivery');
        });
    }
}
