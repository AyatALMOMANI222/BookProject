<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $table = 'book';

    protected $fillable = [
        'title',
        'user_id',
        'price',
        'image',
        'description',
        'author'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function carts()
    {
        return $this->belongsToMany(Cart::class, 'book_cart', 'book_id', 'cart_id')->withPivot('quantity')->withTimestamps();
    }
    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];
}
