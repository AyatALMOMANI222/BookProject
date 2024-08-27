<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function store(Request $request)
    {
        // التحقق من صحة البيانات
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'required',
            'description' => 'required|string|max:1000', // يمكنك تعديل الحد الأقصى حسب الحاجة
            
        ]);

        // الحصول على المستخدم الحالي من التوكن
        $user = Auth::user(); // أو يمكنك استخدام Auth::id() للحصول على user_id مباشرةً

        // إنشاء كتاب جديد
        $book = Book::create([
            'title' => $validated['title'],
            'user_id' => $user->id, // استخدام user_id من الكائن المستخدم
            'price' => $validated['price'],
            'image' => $validated['image'],
            'description' => $validated['description'],
        ]);

        // إرجاع رد JSON مع رسالة النجاح والكتاب المنشأ
        return response()->json(['message' => 'Book created successfully!', 'book' => $book], 201);

    }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'required',
            'description' => 'required|string|max:1000', // يمكنك تعديل الحد الأقصى حسب الحاجة
            
        ]);

        $user = Auth::user();

        $book = Book::where('id', $id)->where('user_id', $user->id)->first();

        if ($book) {
            $book->update([
                'title' => $validated['title'],
                'price' => $validated['price'],
                'image' => $validated['image'],
                'description' => $validated['description'],
            ]);

            return response()->json(['message' => 'Book updated successfully!', 'book' => $book], 200);
        }

        return response()->json(['message' => 'Book not found or unauthorized'], 404);
    }

    // حذف كتاب
    public function delete($id)
    {
        $user = Auth::user();

        $book = Book::where('id', $id)->where('user_id', $user->id)->first();

        if ($book) {
            $book->delete();
            return response()->json(['message' => 'Book deleted successfully!'], 200);
        }

        return response()->json(['message' => 'Book not found or unauthorized'], 404);
    }

    // جلب جميع الكتب
    public function getAllBooks()
    {
        $books = Book::all();
        return response()->json($books, 200);
    }

    // جلب الكتب الخاصة بالمستخدم الحالي
    public function getBooksByUserId()
    {
        $user = Auth::user();
        $books = Book::where('user_id', $user->id)->get();
        return response()->json($books, 200);
    }
}
