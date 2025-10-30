<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Ong extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'ongs';

    protected $fillable = [
        'login',
        'password',
        'nome',
        'nome_fantasia',
        'cnpj',
        'sigla',
        'data_fundacao',
        'id_endereco',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'data_fundacao' => 'date',
    ];

    protected $primaryKey = 'id';
    
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    // relações
    public function projetos()
    {
        return $this->hasMany(Projeto::class, 'id_ong', 'id');
    }

    public function voluntarios()
    {
        return $this->belongsToMany(Voluntario::class, 'ong_voluntario', 'id_ong', 'id_voluntario');
    }

    public function convites()
    {
        return $this->hasMany(Convite::class, 'id_ong', 'id');
    }

    public function endereco()
    {
        return $this->belongsTo(Endereco::class, 'id_endereco', 'id');
    }
}
