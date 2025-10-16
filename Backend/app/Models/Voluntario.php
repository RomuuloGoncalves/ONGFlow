<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
// use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Voluntario extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'voluntarios';

    protected $fillable = [
        'nome',
        'email',
        'password',
        'cpf',
        'data_nascimento',
        'telefone',
        'bio',
        'status',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'data_nascimento' => 'date',
    ];

    protected $primaryKey = 'id';

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    //RELAÇÕE
    public function convite()
    {
        return $this->hasMany(Convite::class, 'id_voluntario', 'id');
    }

    public function ongs()
    {
        return $this->belongsToMany(Ong::class, 'ong_voluntario', 'id_voluntario', 'id_ong');
    }

    public function habilidades()
    {
        return $this->belongsToMany(Habilidade::class, 'voluntario_habilidade', 'id_voluntario', 'id_habilidade');
    }
}
