<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, shrink-to-fit=no">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/card.css" rel="stylesheet">
    <script type='text/javascript' src='http://code.jquery.com/jquery-1.11.0.js'></script>
    <script type='text/javascript' src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script>
    <body>
        <div class="container">
            <h3 class="text-center mt-3">@lang('actions.download_to', ['name' => $name])</h3>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <form method="POST">
                        @csrf
                        <div class="form-group mt-4">
                            <label for="exampleInputEmail1">@lang('actions.change_name')</label>
                            <input required type="text" class="form-control" id="exampleInputEmail1" name="name" placeholder="@lang('content.firstname')">
                        </div>
                        <div class="form-group">
                            <label for="phone">@lang('actions.change_phone')</label>
                            <input required type="text" class="form-control" id="phone" name='phone' placeholder="@lang('content.client.phone')">
                        </div>
                        <div class="text-center  mt-2">
                            <button type="submit" class="btn btn-primary">@lang('actions.submit')</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        @if($errorN)
            <div class="alert alert-danger mt-8">
                <li>{{ $errorN }}</li>
            </div>
        @endif
{{--        @if ($errors->any())--}}
{{--            <div class="alert alert-danger mt-8">--}}
{{--                <ul>--}}
{{--                    @foreach ($errors->all() as $error)--}}
{{--                        @if($errorN)--}}
{{--                            <li>{{ $errorN }}</li>--}}
{{--                        @endif--}}
{{--                        <li>{{ $error }}</li>--}}
{{--                    @endforeach--}}
{{--                </ul>--}}
{{--            </div>--}}
{{--        @endif--}}
    </body>


<script type='text/javascript'>
  $(window).load(function(){
    $("#phone").inputmask("+7(999) 999 99-99");
  });
</script>
</body>
</html>
