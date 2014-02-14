Sprite Pile
===========

Display a collection of sprites. Maybe have metadata like a name or some other
junk.

Edit a sprite by double clicking and opening a pixel editor in a sub-window.

    require "./setup"
    Postmaster = require "postmaster"

    transparent32x32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAALUlEQVRYR+3QQREAAAABQfqXFsNnFTizzXk99+MAAQIECBAgQIAAAQIECBAgMBo/ACHo7lH9AAAAAElFTkSuQmCC"

    $("body").append $ "<button>",
      text: "New Sprite"
      click: ->
        if name = prompt "Image name:"
          editSprite addSprite transparent32x32, name

    toJSON = ->
      $("img").get().reduce (output, img) ->
        output[img.title] = img.src

        output
      , {}

    removeAll = ->
      packery.remove(packery.getItemElements())

    addFromData = (data) ->
      Object.keys(data).forEach (name) ->
        addSprite data[name], name

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
        itemSelector: "img"
        stamp: "button"

      addFromData(require "./images")

    spawnedWindows = []

    # Close spawned windows when closing parent
    $(window).on "unload", ->
      spawnedWindows.forEach (window) ->
        window.close()

    editSprite = (img) ->
      eventProcessor = (event) ->
        if event.source is pixelEditorWindow
          console.log event

          if event.data?.status is "unload"
            # TODO: remove window from list of spawned windows
            removeEventListener eventProcessor

          if dataURL = event.data?.dataURL
            img.src = dataURL

          if event.data?.status is "ready"
            send pixelEditorWindow, "eval", CoffeeScript.compile """
              self.fromDataURL #{JSON.stringify img.src}
              self.on "change", ->
                self.sendToParent
                  dataURL: self.outputCanvas().toDataURL("image/png")

              true
            """, bare: true

      addEventListener "message", eventProcessor, false

      pixelEditorWindow = window.open "http://strd6.github.io/pixel-editor/", "", "width=640,height=480"

      spawnedWindows.push pixelEditorWindow

    sendId = 0
    send = (target, method, params...) ->
      console.log arguments

      target.postMessage
        id: ++sendId
        method: method
        params: params
      , "*"

    $("body").on "dblclick", "img", ->
      editSprite(this)
