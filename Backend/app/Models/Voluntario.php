<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voluntario extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'voluntarios';

    protected $fillable = [
        'nome',
        'email',
        'cpf',
        'data_nascimento',
        'telefone',
        'bio', 
        'status',  
    ];
   
    protected $casts = [
        'data_nascimento' => 'date',
    ];

    protected $primaryKey = 'id';
}