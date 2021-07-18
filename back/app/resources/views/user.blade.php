<table>
    <thead>
        <tr>
            <th>No</th>
            <th>Name</th>
        </tr>
    </thead>
    <tbody>
        @foreach($users as $key => $user)
        <tr>
            <td>{!! $key !!}</td>
            <td>{!! $user->name !!}</td>
        </tr>
        @endforeach
    </tbody>
</table>