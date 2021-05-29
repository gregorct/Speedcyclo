# Bienvenido a Speedcyclo!

El proyecto esta basado en NodeJs, React, Express y Socket.IO.
Está preparado para ser subido a heroku, solo deberás configurar unos pocos parámetros.

 - /client/src/utils/Url.js -> Cambiar la Url
 - Variables de entorno
	 - CONNECTION_URL -> Ruta de conexión a MongoDB
	 - SECRET -> Contraseña para JWT
## Ejecución en local
Para que funcione de forma local deberas de seguir los siguientes pasos.
 1. Instalación del proyecto
    npm install && cd ./client && npm install
2. Cambiar la **url** del archivo */client/src/utils/Url.js* a la ruta del servidor local, por defecto "localhost:5000/".
3. Crear archivo llamado **.env** con las variables de entorno antes mencionadas en la ruta raiz **/**.
4. En la carpeta **/client** ejecutar **npm run build**
5. Iniciarlo desde raíz **/** **node index.js**