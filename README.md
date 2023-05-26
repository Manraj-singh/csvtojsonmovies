
# csvtojsonmovies
Nodejs app to import movie details in csv file , uploading it to Database and displaying it in tabular format with additional endpoints to filter movies and get json response

**refer the document for images,more details**: https://docs.google.com/document/d/1nkjWZ1gN0Vj25bhTnUy6j5dCbPGNyCv4/edit


**API deployed on:** https://csvtojsonmovies.onrender.com/
## Getting Started


- Clone the repository
```bash
git clone https://github.com/Manraj-singh/csvtojsonmovies.git

alternatively download the zip file
```

- navigate to project directory and run npm install to install the dependencies

- create a .env file and fill you mongodb uri connection string
```
MONGO_URI = "your connection string here"
```
- run **npm start or node index.js** to start the server
- The application can now be accessed locally at http://localhost:8000/


## ENDPOINTS:
**baseurl** : https://csvtojsonmovies.onrender.com/
-   [POST] - /upload : to upload csv data into DB
-   [GET] - /movies?genre=comedy : to get filtered data as per genre
-   [GET] - /movies?lang=english : to get filtered data as per language













