<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Voluntario extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes;

    protected $table = 'voluntarios';

    protected $fillable = [
        'nome',
        'email',
        'senha',
        'cpf',
        'data_nascimento',
        'telefone',
        'bio', 
        'status',  
    ];

    protected $hidden = [
        // 'senha',
    ];

    protected $casts = [
        'data_nascimento' => 'date',
    ];

    protected $primaryKey = 'id';

    public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = bcrypt($value);
    }
}