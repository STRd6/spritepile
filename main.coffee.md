Sprite Pile
===========

Display a collection of sprites. Maybe have metadata like a name or some other
junk.

Edit a sprite by double clicking and opening a pixel editor in a sub-window.

    require "./lib/imagesloaded"
    require "./lib/dragabilly"
    require "./lib/packery"

    # initialize Packery
    container = document.body
    packery = new Packery( container )

    # layout Packery after all images have loaded
    imagesLoaded container, ->
      packery.layout()

    # TODO: Close spawned windows when closing parent

    editSprite = (data) ->
      eventProcessor = (event) ->
        if event.source is pixelEditorWindow
          console.log event

          if event.data?.status is "unload"
            removeEventListener eventProcessor

          if event.data?.status is "ready"
            send pixelEditorWindow, "fromDataURL", data

      addEventListener "message", eventProcessor, false

      pixelEditorWindow = window.open "http://strd6.github.io/pixel-editor/", "", "width=640,height=480"

    send = (target, method, params...) ->
      target.postMessage 
        method: method
        params: params
      , "*"

    # TODO: Prepopulate more images
    # TODO: Save images back

    try
      sprites = JSON.parse(localStorage.images)
    catch
      sprites = 
        wizard: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABaUlEQVRYR+2WyxHCMAxEnT6YoQRKoBBqgBNlcIIaKIQSKIEZ+jDeYHmWkGBJAcKBHJjg3z5vJNlNmPhpxuovl9t4Ou3c67gnAhzis8U6HPdz9zruiSIOkMkBrudD8H4GlwO8ezgwOcCYz2B2oLt7ySKvC38AkwNiP+zmB7XAG4xqAIiLaEq53gKaxrTtlpQ0AbBwjDE0zX06vwPiIwB5y8WFIYA0Tr0prGkZHMnip0+Qd25d0w7AAScU0pYLkgnC7EA+/cJqcykupMOo/Me7xVktQGu/7DSLPIj29KvWVg1CoLOAWC0uAOinACyx8DYHICqO5INJFQtagLbe4IdTsRuI0p8Llmpt1SBK+lKIWFz6JTg/kQWFYeg+YPnuXMWsDpSb8FMpTA2eS4kJQE5ErnwM8hUAiEOISzIDWSHUDry6C/YAqFJQPUgqISZ0xbpO8G1Jcy+oOsA3ob7Aq7XVIKoANYGx/ZMD3AAsruMhfeZcmgAAAABJRU5ErkJggg=="

    addSprite = (data) ->
      img = new Image

      img.src = data
      
      document.body.appendChild img

      packery.bindDraggabillyEvents(new Draggabilly( img ))

    Object.keys(sprites).forEach (name) ->
      addSprite sprites[name]

    $("body").on "dblclick", "img", ->
      editSprite(this.src)
