# Backend:  :rocket:

**Grupo Lacombi** &#128256;<br>
**Paupa Hernández y Felipe Guzmán**<br>
**Proyecto IIC2513 - Tecnologías y Aplicaciones Web.**



En este repositorio se utiliza [Koajs](https://koajs.com/) como framework para montar una API y sus end-points, y el ORM [Sequelize](https://sequelize.org/) para manejar la base de datos.

## 1. Requisitos:

- Postgres
- Node.js LTS (10.x or 12.x)
- [YARN](https://yarnpkg.com)
- `src/config/config.js`

## 2. Setup para la base de datos:

- **Crea la base de datos para development:**
    Debes crear una base de datos tal que el nombre sea el siguiente:

    * {my_db_name}_development.

    <br>
- El nombre que se ingrese en `{my_db_name}` habrá que configurarlo luego en el archivo `src/config/config.js` del repositorio.<br>
- Hasta ahora se esta configurado, tal que la base de datos se llama `lacombi_development`.

## 3. Setup del proyecto:

1. Clonar Proyecto

2.  Instalar dependencias con el comando `yarn install`.

3. Crear archivo llamado `.env` en la raiz del repositorio.

4. Agregar las siguientes variables:

    ```sh
        #.env file
        DB_USERNAME = my_db_user
        DB_PASSWORD = my_db_password
        DB_NAME = my_db_name
        DB_HOST = 'localhost'
        PORT = 3000 #opcional
    ```
5.  Correr las migraciones con el siguiente comando:
    ```sh
    yarn sequelize-cli db:migrate
    ```

6. Correr las Seed:

    ```sh 
    yarn sequelize-cli db:seed:all
    ```

## 4. Iniciar el servidor:

1. Iniciar el servidor:

    ```
    yarn start
    ```
2. Opcionalmente, si se desea hacer cambios en el servidor se debe correr:
    ```
    yarn dev
    ````


Ahora se puede ir a [localhost](http://localhost:3000)

## :seven:

## MODELO

El modelo en la base de datos, se puede entender en mayor profunidad viendo el Diagrama Entidad-Relación en el archivo "DiagramaER.jpg".


## Documentación para POSTMAN

La documentación se realizó en Postman, en un workspace llamado "E2_Backend_LaCombi" que se compartió entre los dos integrantes y con la ayudante. Aquí se encuentran todas las rutas separadas por carpetas, y con "View Documentation" se puede apreciar cada ruta, una pequeña descripción y ejemplo de request para cada una. 

## Bonus

En el frontend se implementaron diversas funciones que llaman al backend, las cuales son las siguientes:

1. Dentro de GamePage, al hacer click en cualquier celda, además de mostrar un cohete, se actualiza la información del cohete con id = 1. Además, se muestra la info actualizada del cohete en la parte inferior del tablero.

2. Dentro de la pestaña LeaderBoard, se implementa un boton que llama a todos los PLayers, y muestra se numero de jugador, su nombre de usuario, y su puntaje.

3. Dentro de la pestaña LogIn, se implementa la funcionalidad para crear Players nuevos. Además, se crea un botón llamado  `Mostrar Usuarios Registrados` que le pide al backend una lista con todos los Players y los despliega en la vista.