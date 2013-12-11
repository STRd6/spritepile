Setup
=====

Our libs are shitty and don't feature detect our insane browser environment correctly.

    include = (name) ->
      Function(PACKAGE.distribution["lib/#{name}"].content).call(window)
    
    [
      "dragabilly"
      "imagesloaded"
      "packery"
    ].map (name) ->
      include name
