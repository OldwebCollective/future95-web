---
id: 2026karate
title: 2026 Karate DSL
date: 2026-03-29
displayDate: March 29, 2026
categories:
  - Testing
  - Karate
tags:
  - api-testing
  - karate
  - testing-framework
excerpt: Novedades de este poderoso framework para API Testing!
thumbnail: ./assets/img/posts/2026karate/thumbnail/thumb.webp
---

# 2026 - Karate Framework

## ¿Qué es Karate DSL?

Karate DSL es un framework open-source para testing de APIs que combina:

- Testing funcional
- Automatización
- Validación de JSON / XML
- Mocking

No necesitas saber mucho de Java para usarlo.

---

## ️ Instalación

### Requisitos

- Java 11+
- Maven o Gradle

### Maven (ejemplo)

```xml
<dependency>
  <groupId>com.intuit.karate</groupId>
  <artifactId>karate-junit5</artifactId>
  <version>1.4.1</version>
  <scope>test</scope>
</dependency>
```

---

## Estructura básica

```
src/test/java/
src/test/resources/
  └── features/
        └── users.feature
```

---

## Tu primer test

```gherkin
Feature: Test de API de usuarios

Scenario: Obtener lista de usuarios
  Given url 'https://reqres.in/api/users?page=2'
  When method GET
  Then status 200
```

---

## Validaciones básicas

```gherkin
Scenario: Validar respuesta JSON
  Given url 'https://reqres.in/api/users/2'
  When method GET
  Then status 200
  And match response.data.id == 2
  And match response.data.email == 'janet.weaver@reqres.in'
```

---

## Variables

```gherkin
Scenario: Uso de variables
  * def baseUrl = 'https://reqres.in/api'
  Given url baseUrl + '/users/2'
  When method GET
  Then status 200
```

---

## Parámetros

```gherkin
Scenario: Query params
  Given url 'https://reqres.in/api/users'
  And param page = 2
  When method GET
  Then status 200
```

---

## Requests POST

```gherkin
Scenario: Crear usuario
  Given url 'https://reqres.in/api/users'
  And request { name: 'Kevin', job: 'dev' }
  When method POST
  Then status 201
  And match response.name == 'Kevin'
```

---

## Match avanzado

```gherkin
Scenario: Validaciones flexibles
  Given url 'https://reqres.in/api/users/2'
  When method GET
  Then status 200
  And match response ==
    {
      data: {
        id: '#number',
        email: '#string',
        first_name: '#string'
      }
    }
```

### Tipos especiales

```
| Tipo     | Descripción      |
| -------- | ---------------- |
| #string  | cualquier string |
| #number  | cualquier número |
| #boolean | true/false       |
| #present | debe existir     |
```

---

## Reutilización (call)

```gherkin
Scenario: Reusar lógica
  * def result = call read('classpath:features/login.feature')
  * def token = result.token
```

---

## Headers

```gherkin
Scenario: Auth
  Given url 'https://api.example.com/data'
  And header Authorization = 'Bearer token123'
  When method GET
  Then status 200
```

---

## Data-driven testing

```gherkin
Scenario Outline: Test con múltiples datos
  Given url 'https://reqres.in/api/users/<id>'
  When method GET
  Then status 200
  And match response.data.id == <id>

Examples:
  | id |
  | 1  |
  | 2  |
  | 3  |
```

---

## Hooks (setup)

```gherkin
Background:
  * url 'https://reqres.in/api'
```

---

## Ejecutar tests

### Maven

```bash
mvn test
```

---

## Reportes

Karate genera reportes automáticamente en:

```
target/karate-reports/
```

---

## Tips útiles

- Debug:

```gherkin
* print response
```

- Leer archivos:

```gherkin
* def data = read('data.json')
```

- JavaScript inline:

```gherkin
* def sum = function(a, b){ return a + b }
* match sum(2,3) == 5
```

---

## Buenas prácticas

- Mantén tests pequeños y claros
- Reutiliza lógica con `call`
- Usa `Background` para setup común
- Evita hardcodear datos sensibles

---

## Recursos

- https://karatelabs.io/
- https://github.com/karatelabs/karate
