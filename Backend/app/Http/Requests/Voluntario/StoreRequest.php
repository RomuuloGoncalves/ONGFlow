<?php

namespace App\Http\Requests\Voluntario;

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
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:voluntarios', 'max:255'],
            'cpf' => ['required', 'string', 'digits:11', 'unique:voluntarios,cpf'],
            'data_nascimento' => ['required', 'date', 'before:today'],
            'telefone' => ['required', 'string', 'digits_between:10,15'],
            // 'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password' => ['required', 'string', 'min:8'],
            'bio' => ['nullable', 'string'],
            'status' => ['required', 'in:ativo,inativo'],
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
            'nome.required' => 'O campo nome é obrigatório.',

            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'Por favor, insira um endereço de e-mail válido.',
            'email.unique' => 'Este e-mail já está em uso por outro voluntário.',

            'cpf.required' => 'O campo CPF é obrigatório.',
            'cpf.digits' => 'O CPF deve conter exatamente 11 dígitos, sem pontos ou traços.',
            'cpf.unique' => 'Este CPF já está cadastrado em nosso sistema.',

            'data_nascimento.required' => 'O campo data de nascimento é obrigatório.',
            'data_nascimento.date' => 'O formato da data de nascimento é inválido.',
            'data_nascimento.before' => 'A data de nascimento deve ser uma data anterior a hoje.',

            'telefone.required' => 'O campo telefone é obrigatório.',
            'telefone.digits_between' => 'O telefone deve conter apenas números, incluindo o DDD.',

            'password.required' => 'O campo senha é obrigatório.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            // 'password.confirmed' => 'A confirmação de senha não corresponde.',

            'status.required' => 'O campo status é obrigatório.',
            'status.in' => 'O status selecionado é inválido. Use "ativo" ou "inativo".',
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
