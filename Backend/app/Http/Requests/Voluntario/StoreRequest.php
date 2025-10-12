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
            'email' => ['required', 'email', 'unique:voluntarios'],
            'cpf' => ['required', 'string', 'max:14', 'unique:voluntarios,cpf'],
            'data_nascimento' => ['required', 'date'],
            'telefone' => ['required', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8'],
            'bio' => ['nullable', 'string'],
            'status' => ['required', 'in:ativo,inativo'],
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
            'nome.required' => 'O campo nome é obrigatório.',

            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'Por favor, insira um endereço de e-mail válido.',
            'email.unique' => 'Este e-mail já está em uso.',

            'cpf.required' => 'O campo CPF é obrigatório.',
            'cpf.unique' => 'Este CPF já está cadastrado.',

            'data_nascimento.required' => 'A data de nascimento é obrigatória.',
            'data_nascimento.date' => 'Formato de data inválido.',

            'telefone.required' => 'O campo telefone é obrigatório.',

            'status.required' => 'O campo status é obrigatório.',
            'status.in' => 'O status deve ser "ativo" ou "inativo".',
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

