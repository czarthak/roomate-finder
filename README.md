# Roommate Finder

to build docker image:
docker build -t <image_name>\n
to run said image in detached mode without instant terminating:\n
docker run -it --mount "type=bind,src=$pwd,target=/app" temp bash\n
to enter a running container:\n
docker exec -it <container_name> bash\n


## Getting started

To build the project, create a database using the schema in phase1.sql. Then edit the application.properties file in ./src/main/resources and change the username and password of the root/authorized user to match what you have on the local instance of your mysql db.

Also ensure you have Java 20.0.1 or higher installed globally. Run ./mvnw spring-boot:run to launch the back end server. 
Change directories to /inventory-manager and run npm install and then npm start to launch the front-end server. 
