# Prueba-Tecnica-Backend-Node.j

El desarrollo de esta api tuvo grandes retos entre ellso al organizacion adecuala de la informacion pedida, asi como tambien el despliege de la aplicacion que posteriormente indicare su configuracion y uso.


# BACKEND

Este fue realizado en node.js como gestor de base de datos postgresSQL13

. Inicialmente se debe ejecutar el comando npm install paa obtener todas las dependencias necesarias

## configuraciones base de datos

  . Se debe crear la base de datos con el nombre technical
  
  . Se debe ejecutar el script para la creacion de las tablas este script se encuentra en la carpeta config/db/script.sql
  
  ![imagen](https://user-images.githubusercontent.com/30697632/114922825-c43ddd80-9df1-11eb-929d-7363d79d4070.png)

  . Se debe configurar la conexion de la abse de datos asi node.js este archivo se encuentra en la carpeta config/config.js donde encontrara los datos necesarios 
    para la configuracion dependiendo de las credenciales que se tenga en postgres asi:
    
   ![imagen](https://user-images.githubusercontent.com/30697632/114923163-1848c200-9df2-11eb-8a50-b51e976e7131.png)
   
 ## configuraciones del servidor
 
  . Para la configuracion en necesario que primeramente verifique en el cmd mediante el comando ipconfig cual es su direccion ip la cual debera colocar en el archivo             server.js en la linea 55 de esta manera:
  
  ![imagen](https://user-images.githubusercontent.com/30697632/114923467-7d9cb300-9df2-11eb-8c81-094350408227.png)
  
  Por defecto el puerto utilizado es el 3000



