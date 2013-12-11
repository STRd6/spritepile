Setup
=====

Our libs are shitty and don't feature detect our insane browser environment correctly.

    include = (name) ->
      Function(PACKAGE.distribution["lib/#{name}"].content).call(window)
    
    [
      "draggabilly"
      "imagesloaded"
      "packery"
    ].map (name) ->
      include name

Boot runtime

    runtime = require("runtime")(PACKAGE)
    runtime.boot()
    runtime.applyStyleSheet(require('./style'))
