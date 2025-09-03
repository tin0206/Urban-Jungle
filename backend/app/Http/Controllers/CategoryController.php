<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriesCreate;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categories = Category::all();
        $categories = $categories->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
            ];
        });

        return view('categories.index', compact('categories'));
    }

    /**
     * Display a listing of the resource for API.
     */
    public function apiIndex($category_name = null)
    {
        //
        $query = Category::with('plants');

        if ($category_name) {
            $categoryName = str_replace('-', ' ', $category_name);
            $category = $query->whereRaw('LOWER(name) = ?', [$categoryName])->first();

            if ($category) {
                $plants = $category->plants->map(function ($plant) {
                    return [
                        'id' => $plant->id,
                        'name' => $plant->name,
                        'category_name' => $plant->category->name,
                        'description' => $plant->description,
                        'price' => $plant->price,
                        'date_added' => $plant->created_at->format('Y-m-d H:i:s')
                    ];
                });

                return response()->json($plants);
            }
        }

        $categories = $query->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
            ];
        });

        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoriesCreate $request)
    {
        //
        $category = Category::where('name', $request->input('name'))->first();
        if ($category) {
            return response()->json([
                'message' => 'Category already exists!',
                'category' => $category
            ], 409);
        }
        $category = new Category();
        $category->name = $request->input('name');
        $category->save();
        return response()->json([
            'message' => 'Category created successfully!',
            'category' => $category
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($category_id = null)
    {
        if ($category_id) {
            $category = Category::find($category_id);
            if ($category) {
                $category->delete();
                return response()->json([
                    'message' => 'Category deleted successfully!'
                ]);
            } else {
                return response()->json([
                    'message' => 'Category not found!'
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'Category ID is required!'
            ], 400);
        }
    }
}
