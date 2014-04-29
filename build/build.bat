@echo off
call "Microsoft Ajax Minifier\AjaxMin.exe" -kill:-1 -term -rename:none -Eo:utf-8 -Ei:utf-8 -clobber -unused:keep "..\js\area.js" "..\js\areaData.js" -out "..\js\area_min.js"
pause