<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
    use HasFactory;
    protected $table = 'enderecos';

    protected $fillable = [
        'cep',
        'logradouro',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
    ];

    public function ong()
    {
        return $this->hasOne(Ong::class, 'id_endereco');
    }

    public function voluntario()
    {
        return $this->hasOne(Voluntario::class, 'id_endereco');
    }

    public function projeto()
    {
        return $this->hasOne(Projeto::class, 'id_endereco');
    }
}
