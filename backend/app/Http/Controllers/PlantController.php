<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlantsCreate;
use App\Models\Category;
use App\Models\Plant;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\AssignOp\Plus;

use function PHPSTORM_META\map;

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
    public function apiIndex(Request $request, $plant_name = null)
    {
        //
        $query = Plant::with('category');

        if ($plant_name) {
            $plantName = str_replace('-', ' ', $plant_name);
            $plant = $query->whereRaw('LOWER(name) = ?', [$plantName])->first();
            if ($plant) {
                return response()->json([
                    'id' => $plant->id,
                    'name' => $plant->name,
                    'category_name' => $plant->category->name,
                    'description' => $plant->description,
                    'price' => $plant->price,
                    'date_added' => $plant->created_at->format('Y-m-d H:i:s')
                ]);
            }
            return response()->json(['error' => 'Plant not found'], 404);
        }

        $plants = $query->get()->map(function ($plant) {
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

    /**
     * Display a listing of plants for local storage.
     */
    public function apiLocalStorage(Request $request) {
        $plantsId = collect($request->input('plants_id'));

        $removedPlants = $plantsId->filter(function ($id) {
            if (Plant::where('id', $id)->exists()) {
                return false;
            }
            return true;
        });

        $plants = $plantsId->filter(function ($id) {
            return Plant::where('id', $id)->exists();
        })->map(function ($id) {
            $plant = Plant::find($id);
            return [
                'id' => $plant->id,
                'plant_name' => $plant->name,
                'category_name' => $plant->category->name,
                'description' => $plant->description,
                'price' => $plant->price
            ];
        });

        return response()->json([
            'plants' => $plants,
            'removed_plants' => $removedPlants,
        ]);
    }

    /**
     * Display a listing of new products for API.
     */
    public function apiNewProducts(Request $request)
    {
        $newProducts = Plant::with('category')
            ->orderBy('created_at', 'desc')
            ->limit(9)
            ->get()
            ->map(function ($plant) {
                return [
                    'id' => $plant->id,
                    'name' => $plant->name,
                    'category_name' => $plant->category->name,
                    'description' => $plant->description,
                    'price' => $plant->price
                ];
            });

        return response()->json($newProducts);
    }

    /**
     * Display a listing of related plants for API.
     */
    public function apiRelated(Request $request, $plant_name)
    {
        $plantName = str_replace('-', ' ', $plant_name);
        $plant = Plant::whereRaw('LOWER(name) = ?', [$plantName])->first();
        if ($plant) {
            $relatedPlants = Plant::where('category_id', $plant->category_id)
                ->where('id', '!=', $plant->id)
                ->inRandomOrder()
                ->limit(4)
                ->get()
                ->map(function ($relatedPlant) {
                    return [
                        'id' => $relatedPlant->id,
                        'name' => $relatedPlant->name,
                        'category_name' => $relatedPlant->category->name,
                        'description' => $relatedPlant->description,
                        'price' => $relatedPlant->price
                    ];
                });
            return response()->json($relatedPlants);
        }
        return response()->json(['error' => 'Plant not found'], 404);
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
