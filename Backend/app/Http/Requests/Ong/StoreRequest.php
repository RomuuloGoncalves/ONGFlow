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
            'login' => ['required', 'email', 'unique:ongs,login', 'max:255'],
            // 'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password' => ['required', 'string', 'min:8'],
            'nome' => ['required', 'string', 'max:255'],
            'nome_fantasia' => ['string', 'max:255'],
            'cnpj' => ['required', 'string', 'digits:14', 'unique:ongs,cnpj'],
            'data_fundacao' => ['required', 'date', 'before:today'],
            'sigla' => ['required', 'string', 'max:255'],
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
            'login.required' => 'O campo e-mail de login é obrigatório.',
            'login.unique' => 'Este e-mail de login já está em uso por outra ONG.',
            'login.email' => 'Por favor, insira um endereço de e-mail válido para o login.',

            'password.required' => 'O campo senha é obrigatório.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            // 'password.confirmed' => 'A confirmação de senha não corresponde.',

            'nome.required' => 'O campo nome da ONG é obrigatório.',

            'nome_fantasia.required' => 'O campo nome fantasia é obrigatório.',

            'cnpj.required' => 'O campo CNPJ é obrigatório.',
            'cnpj.digits' => 'O CNPJ deve conter exatamente 14 dígitos, sem pontos, traços ou barras.',
            'cnpj.unique' => 'Este CNPJ já está cadastrado em nosso sistema.',

            'data_fundacao.required' => 'O campo data de fundação é obrigatório.',
            'data_fundacao.date' => 'O formato da data de fundação é inválido.',
            'data_fundacao.before' => 'A data de fundação deve ser uma data anterior a hoje.',

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
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Existem erros de validação no seu formulário.',
            'errors'    => $validator->errors()
        ], 422));
    }
}
