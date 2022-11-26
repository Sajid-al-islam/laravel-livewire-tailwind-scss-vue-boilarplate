<html>
<head>
    <title>{{$title??''}}</title>
    <meta property="og:title" content="{{$title??''}}" />
    <meta property="og:site_name" content="{{$title??''}}" />
    <meta property="og:description" content="{{$title??''}}" />
    <meta property="og:image" content="{{$meta_image??''}}" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="315" />

    <meta name="twitter:title" content="{{$title??''}}">
    <meta name="twitter:description" content="{{$title??''}}">
    <meta name="twitter:image" content="{{$meta_image??''}}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    @livewireStyles
    <script src="/js/app.js" defer></script>
</head>
<body>

    <div wire:loading.delay>...</div>
    <nav>
        <a href="/login">login</a>
        <a href="/register">register</a>
    </nav>
    @yield('content')

    @livewireScripts

    <script defer>
        document.addEventListener("DOMContentLoaded", () => {
            Livewire.hook('component.initialized', (component) => {})
            Livewire.hook('element.initialized', (el, component) => {})
            Livewire.hook('element.updating', (fromEl, toEl, component) => {})
            Livewire.hook('element.updated', (el, component) => {})
            Livewire.hook('element.removed', (el, component) => {})
            Livewire.hook('message.sent', (message, component) => {})
            Livewire.hook('message.failed', (message, component) => {})
            Livewire.hook('message.received', (message, component) => {
                console.log(component.data);
            })
            Livewire.hook('message.processed', (message, component) => {
            })
        });
        document.addEventListener("turbolinks:load", function(event) {
            console.log('load');
            window.livewire.start();
        });
    </script>
</body>
</html>
