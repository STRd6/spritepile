Sprite Pile
===========

Display a collection of sprites. Maybe have metadata like a name or some other
junk.

Edit a sprite by double clicking and opening a pixel editor in a sub-window.

    require "./setup"

    docReady ->
      console.log "yolo"
      container = document.querySelector("body")

      # layout Packery after all images have loaded
      imagesLoaded container, ->
        packery.layout()

      addSprite = (data) ->
        item = $ "<div>",
          class: "item"
  
        img = new Image
        img.src = data
        item.append img
        
        item.appendTo container
  
      sprites = require "./images"
      Object.keys(sprites).forEach (name) ->
        [0...50].map ->
          addSprite sprites[name]

      packery = new Packery container,
        columnWidth: 40
        rowHeight: 40

      packery.layout()

      packery.getItemElements().forEach (element) ->
        draggie = new Draggabilly element

        packery.bindDraggabillyEvents(draggie)

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

    $("body").on "dblclick", "img", ->
      editSprite(this.src)
