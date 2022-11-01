# Dripify System

## App Description

---
## installation instructions


---
## a link to the deployed live site
Not Done yet!!


---
## Approach Taken
I did these

<br>

---
## Explaination of the Technologies Used
I did 

---
## Wireframes

### Shop Page
![ERD](/Wireframes/Shop-Page.png)


### Single Shop Page
![ERD](/Wireframes/Single-Shop-Page.png)


### Login Page
![ERD](/Wireframes/Login-Page.png)


### Sign Up Page
![ERD](/Wireframes/Signup-Page.png)


### Admin Page
![ERD](/Wireframes/Admin-Page.png)


---
## ERDs
![ERD](/Diagrams/ERD.png)


---
## Route Table
a RESTful routing chart of all your app's routes

route | Method | response
------|---------|-----
`/` | get | responds with home page
`/users` | get |  responds with users home page
`/users/new` | get | responds with signup page for new users
`/users/new` | post | responds with the user being registered then redirected to main page
`/users/login` | get | responds with login page
`/users/login` | post | responds with login page
`/users/logout` | get | responds deleteing the user cookie and redirecting to main page
`/users/profile` | get | responds with profile page
`/users/my-stuff` | get | responds with my-stuff page
`/users/add-review` | post | responds with adding a new review to the database and redirecteing to the same page
`/users/my-stuff/add-product` | get | responds with Add Product Page
`/users/my-stuff/add-product` | post | responds with adding the product to the database
`/users/my-stuff/add-product` | put | responds with updating the product to the database
`/users/my-stuff/delete/:id` | delete | responds with deleting the product from the database
`/users/my-stuff/:id` | get | responds with page that displays full product details
`/shop/` | get | responds with shop page that has all the products for sale
`/shop/blog` | get | responds with blog page that has products that are not for sale
`/shop/:id` | get | responds with shop page for a single product and that display the full product details
`/admin/` | get | responds with admin main page
`/admin/users-management` | get | responds with users-management page
`/admin/delete-user` | delete | responds with deletion of user and redirect to `/admin/users-management` route




---

## Post-Project Reflection
Scheduling anf Time management since the web app is full stack and requires more time than the previous project.

<br>

---
## Sources Used