<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $table = 'projects';
    public const NATIONAL_LEVEL = 0;
    public const FEDERAL_LEVEL = 1;
    public const REGIONAL_LEVEL = 2;
    public static $classLevel = -1;
    protected static function boot()
    {
        parent::boot();
        self::addGlobalScope(function (Builder $builder) {
            return $builder->where('type', static::$classLevel);
        });
    }
    /**
     * @return HasMany
     */
    public function passport() : BelongsTo
    {
        return $this->belongsTo(File::class, 'passport_file_id');
    }

    public function save(array $options = [])
    {
        if ($this->type === null) {
            $this->type = static::$classLevel;
        }
        return parent::save($options);
    }

}
