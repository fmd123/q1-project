Category :
<input type="text" id="cat" value="nerdy"> Number of Jokes :
<input type="text" id="num" value="3">
<div id="myBtn"><a href="">Click Me</a></div>
<div id="output"></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script>
    $(document).ready(function () {
        $('#myBtn a').click(function (e) {
            var url = 'http://api.icndb.com/jokes/random/' + $('#num').val();
            e.preventDefault();
            $.ajax({
                url: url
                , type: 'GET'
                , data: {
                    'limitTo': '[' + $('#cat').val() + ']'
                }
                , dataType: 'json'
                , success: function (data) {
                    $.each(data.value, function (key, index) {
                        $('#output').append('<br>' +index.id + ' '+ index.joke);
                    })
                    console.log(data);
                }
                , error: function (data) {
                    console.log(data);
                    // $('#output').append('<br>' + data.statusText);
                }
            })
        })
    })
</script>