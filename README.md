# Segunda-Integradora-BE-Galvaliz

El proyecto esta compuesto por:

Src: A. Confing contiene a un archivo configs que trabaja con dotenv (quien permite asignar variables y variables y ocultarlos para que nadie los vea). 
     B. Dao quien comprende a: una carpeta fs(donde estan los archivos relacionados a file sistem), 
     una carpeta models(que abarca a los modelos de usuario, carrito, mensaje y productos), 
     y los mangers que trabajaran con dichos modelos.
     C. MidsIngreso quien encierra a los archivos: bcrypt(quien se encarga de la encriptacion de contraseñas), 
     github(quien se ocupa del ingreso a la app con la cuenta de GitHub), passport(quien trabaja con el login clasico de la pagina junto con la encriptacion por jwt),
     y passAuth(quien aloja a los sistemas de autorizacion de usuario al ingreso). 
     D. Public envuelve a: css (donde se aloja el archivo style, quien da los estilos a la pagina), images (contiene la imagen del cliente), 
     js (inluye dento a login, quien trabaja el ingreso al sitio, y tambien a restore, quien trabaja con las implicaciones del cambio de contraseña), 
     y tambien se encuentran aqui cart(se encarga del carrito), chat(modera las partes del mismo), realTimeProducts(domina el ingreso y egreso de los productos a la app),
     register(hospeda al registro) y user para el usuario.
     E. Routes alberga a las diversas rutas de acceso como: cart, session, views y products. 
Views establece las vistas mediante handlebars para: layouts(main) y tambien para cart, chat, products, profile, login, realTimeProducts, register y restore.
Env: tabaja alojando las variables de dotenv.
App.js donde confluyen todas las partes de la app para que esta funcione y cobre vida.
Utils quien aloja al __dirname.
