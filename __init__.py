import shutil
import folder_paths
import os, sys, subprocess
import filecmp



print("### Loading: Save as Webp")

comfy_path = os.path.dirname(folder_paths.__file__)

def setup_js():
   webp_path = os.path.dirname(__file__)
   js_dest_path = os.path.join(comfy_path, "web", "extensions", "webpinfo")
   js_src_path = os.path.join(webp_path, "webpinfo", "webpinfo.js")
     
   ## Creating folder if it's not present, then Copy. 
   print("Copying JS files for Workflow loading")
   if (os.path.isdir(js_dest_path)==False):
     os.mkdir(js_dest_path)
     shutil.copy(js_src_path, js_dest_path)
   else:
     shutil.copy(js_src_path, js_dest_path)
           

                     
setup_js()

from .Save_as_webp import NODE_CLASS_MAPPINGS

__all__ = ['NODE_CLASS_MAPPINGS']