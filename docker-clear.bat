@echo off
FOR /f "tokens=*" %%i IN ('docker ps -aq') DO docker rm %%i
FOR /f "tokens=*" %%i IN ('docker images eliakaris/blog -q') DO docker rmi -f %%i
FOR /f "tokens=*" %%i IN ('docker images --filter "dangling=true" -q') DO docker rmi -f %%i
