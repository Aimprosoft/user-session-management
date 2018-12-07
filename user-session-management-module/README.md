## Docker Deployment

### build containers throw docker-compose

run docker-compose up --build
### build containers in console

1. create network `docker network create`
2. in {project.dir}/user-session-management-platform enter next command
       `docker build -t alfresco-content-repository-community:latest .`
3. in {project.dir}/user-session-management-share enter next command
       `docker build -t alfresco/alfresco-share:6.0.b .`
4. in {project.dir} run 
    `docker run postgres:10.1
    -p 5432:5432 
    --env POSTGRES_USER=alfresco 
    --env POSTGRES_PASSWORD=alfresco 
    --env POSTGRES_DB=alfresco 
    --name alf-usermanagement-postgres 
    --network alf-management-net`
5. run `docker run -p 8983:8983 
    --env SOLR_ALFRESCO_HOST=alf-usermanagement-repo 
    --env SOLR_ALFRESCO_PORT=8080 
    --env SOLR_SOLR_HOST=alf-usermanagement-search 
    --env SOLR_SOLR_PORT=8983 
    --env SOLR_CREATE_ALFRESCO_DEFAULTS=alfresco,archive 
    --name alf-usermanagement-search 
    --network alf-management-net
    alfresco/alfresco-search-services:1.2.0`
6. run `docker run 
    -p 8080:8080 -p 5005:5005 
    -v {project.dir}/alf_data:/usr/local/tomcat/alf_data 
    --env JAVA_OPTS="-Ddb.driver=org.postgresql.Driver 
                    -Ddb.username=alfresco 
                    -Ddb.password=alfresco 
                    -Ddb.url=jdbc:postgresql://alf-usermanagement-postgres:5432/alfresco 
                    -Dsolr.host=alf-usermanagement-search 
                    -Dsolr.port=8983 
                    -Dsolr.secureComms=none 
                    -Dsolr.base.url=/solr 
                    -Dindex.subsystem.name=solr6 
                    -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005" 
    --name alf-usermanagement-repo 
    --network alf-management-net
    alfresco-content-repository-community:latest` 
    (Change {project.dir} to your location)
7. run `docker run -p 8081:8080 -p 5006:5006 
    --env JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5006" 
    --env REPO_HOST=alf-usermanagement-repo 
    --env REPO_PORT=8080 
    --name alf-usermanagement-share 
    --network alf-management-net
    alfresco/alfresco-share:6.0.b` 
### Build container in docker integration plugin

- Create similar dockerfile configs with the properties above

### Run alfresco as maven project

- Create maven run config with `clean install -DskipTests=true alfresco:run` command

### Debugging

- for debugging in docker container attache (Run->Attach to the process)
 to the needed container (5005 - repository, 5006 - share)

