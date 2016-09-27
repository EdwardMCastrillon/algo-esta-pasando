#!/usr/bin/env bash

npm run build-prod
ssh integro@d.algoestapasando.cc "rm -rf /home/integro/web/* && mkdir /home/integro/web/src"
scp public/*.* integro@d.algoestapasando.cc:/home/integro/web
