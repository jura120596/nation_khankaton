<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BagColorCreateRequest extends FormRequest
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
        return [
            'name' => 'required|string',
            'class' => 'required|string|regex:/^[A-Za-z0-9_#]+$/i',
            'main_picture' => 'required|mimes:jpg,bmp,png,jpeg',
            'w_picture' => 'required|mimes:jpg,bmp,png,jpeg',
            'v_picture' => 'required|mimes:jpg,bmp,png,jpeg',
            'icon' => 'required|mimes:jpg,bmp,png,jpeg',
            'is_picture' => 'string|max:2',
        ];
    }
}
