Sprite Pile
===========

Display a collection of sprites. Maybe have metadata like a name or some other
junk.

Edit a sprite by double clicking and opening a pixel editor in a sub-window.

    require "./setup"

    transparent32x32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAALUlEQVRYR+3QQREAAAABQfqXFsNnFTizzXk99+MAAQIECBAgQIAAAQIECBAgMBo/ACHo7lH9AAAAAElFTkSuQmCC"

    $("body").append $ "<button>",
      text: "New Sprite"
      click: ->
        editSprite addSprite transparent32x32

    packery = null
    container = document.querySelector("body")

    makeDraggable = (element) ->
      draggie = new Draggabilly element

      packery.bindDraggabillyEvents(draggie)

    addToPackery = (item) ->
      container.appendChild item
      packery.appended item

      makeDraggable item

    addSprite = (data, name) ->
      img = new Image
      img.src = data
      img.title = name

      addToPackery(img)

      return img

    docReady ->
      # layout Packery after all images have loaded
      imagesLoaded container, ->
        packery.layout()

      packery = new Packery container,
        columnWidth: 40
        rowHeight: 40
        item: "img"
        stamp: "button"

      sprites = require "./images"
      Object.keys(sprites).forEach (name) ->
        addSprite sprites[name], name

    # TODO: Close spawned windows when closing parent

    editSprite = (img) ->
      eventProcessor = (event) ->
        if event.source is pixelEditorWindow
          console.log event

          if event.data?.status is "unload"
            removeEventListener eventProcessor

          if dataURL = event.data?.dataURL
            # TODO: Save to localStorage
            img.src = dataURL

          if event.data?.status is "ready"
            send pixelEditorWindow, "eval", CoffeeScript.compile """
              self.fromDataURL #{JSON.stringify img.src}
              self.on "change", ->
                self.sendToParent
                  dataURL: self.outputCanvas().toDataURL("image/png")
            """, bare: true

      addEventListener "message", eventProcessor, false

      pixelEditorWindow = window.open "http://strd6.github.io/pixel-editor/", "", "width=640,height=480"

    send = (target, method, params...) ->
      target.postMessage
        method: method
        params: params
      , "*"

    $("body").on "dblclick", "img", ->
      editSprite(this)
