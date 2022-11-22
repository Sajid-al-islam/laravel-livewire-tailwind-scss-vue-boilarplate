<div>
    {{-- The whole world belongs to you. --}}
    show posts

    <ul>
        @foreach ($users as $item)
            <li>{{$item->username}}</li>
        @endforeach
    </ul>
</div>
