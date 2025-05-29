<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Plant List</title>
</head>
<body>
    <h1>Plants</h1>
    <ul>
        @foreach($plants as $plant)
            <li>
                <div>
                    {{ $plant->name }}
                </div>
                <div>
                    {{ $plant->category_id }}
                </div>
                <div>
                    {{ $plant->description }}
                </div>
                <div>
                    {{ $plant->price }}
                </div>
            </li>
        @endforeach
    </ul>
</body>
</html>
