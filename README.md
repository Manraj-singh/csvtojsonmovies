
# csvtojsonmovies
Nodejs app to import movie details in csv file , uploading it to Database and displaying it in tabular format with additional endpoints to filter movies and get json response

**refer the document for images,more details**: https://docs.google.com/document/d/1nkjWZ1gN0Vj25bhTnUy6j5dCbPGNyCv4/edit



## Getting Started


- Clone the repository
```bash
download the zip file of postgres-branch
```

- navigate to project directory and run npm install to install the dependencies

- create a .env file and fill you postgresSQL details
```
  DB_HOST= "localhost"
  DB_USER =  "<your user>"
  DB_PORT = 5432
  DB_PASSWORD = "<your password>"
  DB_NAME = "postgres"
```
- run **npm start or node index.js** to start the server
- The application can now be accessed locally at http://localhost:8000/


## ENDPOINTS:
**baseurl** : http://localhost:8000/pg
-   [POST] - /upload : to upload csv data into postgres
-   [GET] - /movies?genre=comedy : to get filtered data as per genre
-   [GET] - /movies?lang=english : to get filtered data as per language













