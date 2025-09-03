<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalAccessToken extends Model
{
    use HasFactory;

    protected $table = 'personal_access_token';

    protected $fillable = [
        'user_id',
        'token',
        'expires_at',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
