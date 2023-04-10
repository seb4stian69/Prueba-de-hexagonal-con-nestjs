# Primer acercamiento de arquitectura hexagonal con NestJS
Repositorio creado con la finalidad de mantener un control de versionamiento para las pruebas realizadas en la implemantacion de una arquitectura hexagonal con NestJS. El ejemplo se basa en un modelo para la creacion de una tienda en linea la cual es capaz de registar, editar, listar, eliminar y vender productos, se necesitan validaciones y manejo de excepciones

# Modelo de Domain Driven Design
<a href='./Photos/DiagramaDDDRetoHexagonal.drawio'>Enlace del diagrama</a> <br>
<img alt="Imagen del diagrama" src='./Photos/DiagramaDDDRetoHexagonal-Modelado - [Tienda].drawio.png'></img>

# Test unitarios finalizados con 0% coverage
<img alt="Imagen de coverage [Aun no hago los test]"></img>
<ul>
    <li><code>npm run test || pnpm run test</code></li>
</ul>

# Pasos para ejecutar el proyecto
<ul>
    <li><code>npm install || pnpm import</code></li>
    <li><code>npm run start:dev || pnpm run start:dev</code></li>
    <li>Aun no agrego el socket por ende no es necesario tener levantado el ambiente de docker y rabbitmq en el dispositivo</li>
</ul>

# Endpoints
<ul>
    <h3>Users endpoints</h3>
    <li><code>/user&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- GET</code></li>
    <li><code>/user&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- POST</code></li>
</ul>
<ul>
    <h3>Shops endpoints</h3>
    <li><code>/shop&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- GET</code></li>
    <li><code>/shopbyid&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- GET</code></li>
    <li><code>/shop&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- POST</code></li>
</ul>
<ul>
    <h3>Products endpoints</h3>
    <li><code>/product&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- GET</code></li>
    <li><code>/shop/product&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- GET</code></li>
    <li><code>/shop/productbyid&emsp;&emsp;&emsp;|<- GET</code></li>
    <li><code>/shop/productlimits&emsp;|<- GET</code></li>
    <li><code>/shop/product&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- POST</code></li>
    <li><code>/shop/product&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- PUT</code></li>
    <li><code>/shop/product&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- DELETE</code></li>
</ul>
<ul>
    <h3>Buys endpoints</h3>
    <li><code>/shop/buy&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- GET</code></li>
    <li><code>/shop/buybyuserid&emsp;&emsp;&emsp;|<- GET</code></li>
    <li><code>/shop/buy&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<- POST</code></li>
</ul>