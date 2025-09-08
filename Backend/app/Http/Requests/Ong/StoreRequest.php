<?php

namespace App\Http\Requests\Ong;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'login' => ['required', 'email', 'unique:ongs,login'],
            'password' => ['required', 'string', 'min:8'],
            'nome_fantasia' => ['required', 'string', 'max:255'],
            'cnpj' => ['required', 'string', 'max:14', 'unique:ongs,cnpj'],
            'data_fundacao' => ['required', 'date'],
            'sigla' => ['required', 'string', 'max:255'],
            // 'endereco_id' => ['nullable', 'integer', 'exists:enderecos,id'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'login.required' => 'O campo nome login é obrigatório.',
            'login.unique' => 'Este login já está em uso.',

            'nome_fantasia.required' => 'O campo nome fantasia é obrigatório.',

            'password.required' => 'O campo senha é obrigatório.',
            
            'cnpj.required' => 'O campo CNPJ é obrigatório.',
            'cnpj.unique' => 'Este CNPJ já está cadastrado.',
            
            'data_fundacao.required' => 'A data de fundação é obrigatória.',
            'data_fundacao.date' => 'Formato de data inválido.',
            
            'sigla.required' => 'O campo sigla é obrigatório.',
            
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        // Isso impede o redirecionamento padrão.
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Dados inválidos',
            'errors'    => $validator->errors()
        ], 422)); 
    }
}
