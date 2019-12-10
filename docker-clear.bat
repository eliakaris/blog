@echo off
FOR /f "tokens=*" %%i IN ('docker ps -aq') DO docker rm %%i
FOR /f "tokens=*" %%i IN ('docker images eliakaris/web -q') DO docker rmi -f %%i
FOR /f "tokens=*" %%i IN ('docker images eliakaris/api -q') DO docker rmi -f %%i
FOR /f "tokens=*" %%i IN ('docker images eliakaris/prod-proxy -q') DO docker rmi -f %%i
FOR /f "tokens=*" %%i IN ('docker images --filter "dangling=true" -q') DO docker rmi -f %%i
