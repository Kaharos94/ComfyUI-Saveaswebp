# ComfyUI-Saveaswebp
Save a picture as Webp file in Comfy + Workflow loading

## Warning: 

I'm a novice at best at coding and some of the code is pretty hacky, so this can definitely break.

### Known issues:

Import of Webpfiles breaks if import a workflow that has }Prompt:{ in a Node that has dynamic wildcards disabled.

## Description:

This adds a custom node to save a picture as a Webp File and also adds a script to Comfy to drag and drop generated webpfiles into the UI to load the workflow. 
At the moment it saves the WebP file as lossless, achieving filesizes around 30% smaller than PNG at similar quality. 

I'm planning to add compression options to the node itself soon. 

## Installation: 

Copy the webpinfo folder into ComfyUI/web/extensions and the Save_as_webp.py in ComfyUI/custom-nodes. 
