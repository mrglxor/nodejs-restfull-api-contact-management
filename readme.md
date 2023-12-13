# RESTful API Nodejs

![Contact Management Logo](https://dummyimage.com/600x400/000/fff&text=Contact+Management)

Contact Management API is a powerful and easy-to-use solution for managing your contacts and addresses. This RESTful API is built with Node.js and Express and the database uses Mysql, providing smooth integration and easy implementation.

## Project Overview

- **Project Name:** Contact Management API
- **Description:** A RESTful API for managing user information, contacts, and addresses.
- **Version:** 1.0
- **Deployment:** [Railway](https://contact-management.up.railway.app/)
- **Status:** Released

## Table of Contents

- [User API Spec](#user-api-spec)
  - [Register User API](#register-user-api)
  - [Login User API](#login-user-api)
  - [Update User API](#update-user-api)
  - [Get User API](#get-user-api)
  - [Logout User API](#logout-user-api)
- [Contact API Spec](#contact-api-spec)
  - [Create Contact API](#create-contact-api)
  - [Update Contact API](#update-contact-api)
  - [Get Contact API](#get-contact-api)
  - [Search Contact API](#search-contact-api)
  - [Remove Contact API](#remove-contact-api)
- [Address API Spec](#address-api-spec)
  - [Create Address API](#create-address-api)
  - [Update Address API](#update-address-api)
  - [Get Address API](#get-address-api)
  - [List Addresses API](#list-addresses-api)
  - [Remove Address API](#remove-address-api)

# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "hans",
  "password": "rahasia",
  "name": "Muhamad Farhan"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "hans",
    "name": "Muhamad Farhan"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "hans",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Muhamad Farhan Terupdate",
  "password": "rahasiaterupdate"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "hans",
    "name": "Muhamad Farhan Terupdate"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body :

```json
{
  "data": {
    "username": "hans",
    "name": "Muhamad Farhan"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Muhamad",
  "lastName": "Farhan",
  "email": "hans@io.com",
  "phone": "62823456781"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhamad",
    "lastName": "Farhan",
    "email": "hans@io.com",
    "phone": "62823456781"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Muhamad",
  "lastName": "Farhan Ma'ali",
  "email": "hans@maal.com",
  "phone": "62823456781"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhamad",
    "lastName": "Farhan Ma'ali",
    "email": "hans@maal.com",
    "phone": "62823456781"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhamad",
    "lastName": "Farhan",
    "email": "farhan@io.com",
    "phone": "62823456781"
  }
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query params :

- name : Search by firstName or lastName using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Muhamad",
      "lastName": "Farhan",
      "email": "hans@io.com",
      "phone": "62823456781"
    },
    {
      "id": 2,
      "firstName": "Muhamad",
      "lastName": "Farhan",
      "email": "hans@io.com",
      "phone": "62823456781"
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Request Body :

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postalCode": "Kode pos apa"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postalCode": "Kode pos apa"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan Subroto",
  "city": "Bandung",
  "province": "Jawa Barat",
  "country": "Indonesia",
  "postalCode": "12345"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Subroto",
    "city": "Bandung",
    "province": "Jawa Barat",
    "country": "Indonesia",
    "postalCode": "12345"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contacId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postalCode": "Kode pos apa"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## List Addresses API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postalCode": "Kode pos apa"
    },
    {
      "id": 2,
      "street": "Jalan Subroto",
      "city": "Bandung",
      "province": "Jawa Barat",
      "country": "Indonesia",
      "postalCode": "12345"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "address is not found"
}
```
