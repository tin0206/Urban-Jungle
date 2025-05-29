<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlantsCreate;
use App\Models\Category;
use App\Models\Plant;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\AssignOp\Plus;

class PlantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $plants = Plant::all();
        return view('plants.index', compact('plants'));
    }

    /**
     * Display a listing of the resource for API.
     */
    public function apiIndex()
    {
        //
        $plants = Plant::with('category')->get();
        $plants = $plants->map(function ($plant) {
            return [
                'id' => $plant->id,
                'name' => $plant->name,
                'category_name' => $plant->category?->name,
                'description' => $plant->description,
                'price' => $plant->price,
            ];
        });

        return response()->json($plants);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categories = Category::all();
        return view('plants.create')->with('categories', $categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlantsCreate $request)
    {
        //
        $plant = new Plant();
        $plant->name = $request->input('name');
        $plant->description = $request->input('description');
        $plant->category_id = $request->input('category_id');
        $plant->price = $request->input('price');
        $plant->save();
        return redirect()->route('plants.create')->with('success', 'Plant created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Plant $plant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plant $plant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Plant $plant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plant $plant)
    {
        //
    }
}
