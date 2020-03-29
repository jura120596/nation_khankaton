<?php

namespace App\Http\Requests;

/**
 * Class ChecholColorUpdateRequest
 * @package App\Http\Requests
 */
class NewsUpdateRequest extends NewsCreateRequest
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
        $rules = parent::rules();
        return array_merge($rules, [
            'photo' => str_replace('required|', '', $rules['photo']),
        ]);
    }
}
