<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Category List</title>
</head>
<body>
    <h1>Categories</h1>
    <ul>
        @foreach($categories as $category)
            <li>{{ $category->name }} <small>({{ $category->created_at->format('d-m-Y') }})</small></li>
        @endforeach
    </ul>
</body>
</html>
