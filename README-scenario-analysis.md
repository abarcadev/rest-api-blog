# Scenario analysis

#### Question: Given a distributed system that experiences latencies and occasional failures in one of its microservices, how would you optimize it?
#### Describe your approach to identifying the problem, possible solutions, and how you would ensure high availability and resilience

Para identificar:
1. Revisaría los logs en el microservicio que presenta fallos, para detectar si es error de programación o proviene de la base de datos o si es un caso de uso no controlado.
2. Revisaría en el servidor el tiempo de respuesta de los servicios más críticos.

Para optimizar:
1. En el microservicio trataría de hacer una refactorización del código.
2. En la base de datos agregaría índices a las tablas que son más utilizadas.
3. En el servidor sugeriría implementar balanceadores de carga.
