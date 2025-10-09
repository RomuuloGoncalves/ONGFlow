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

class Ong extends Model
{
    /** @use HasFactory<\Database\Factories\OngFactory> */
    use HasApiTokens, HasFactory;

    protected $table = 'ongs';

    protected $fillable = [
        'login',
        'password',
        'nome',
        'nome_fantasia',
        'cnpj',
        'sigla',
        'data_fundacao',
        // 'endereco_id'
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

    public function endereco()
    {
        return $this->belongsTo(Endereco::class, 'endereco_id');
    }

}
