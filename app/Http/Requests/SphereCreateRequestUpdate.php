<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SphereCreateRequestUpdate extends SphereCreateRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return array_merge(parent::rules(), [
            'photo' => str_replace('required|', '', parent::rules()['photo']) . '|nullable',
            'logo' => str_replace('required|', '', parent::rules()['logo']) . '|nullable',
        ]);
    }
}
