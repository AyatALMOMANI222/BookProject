<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('book', function (Blueprint $table) {
            // تعديل العمود 'published_date' ليكون غير ضروري
            $table->date('published_date')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('book', function (Blueprint $table) {
            // إعادة العمود 'published_date' ليكون مطلوبًا
            $table->date('published_date')->nullable(false)->change();
        });
    }
};
