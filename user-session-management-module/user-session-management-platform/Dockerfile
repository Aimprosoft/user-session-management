FROM alfresco/alfresco-content-repository-community:latest

ARG TOMCAT_DIR=/usr/local/tomcat

RUN mkdir -p $TOMCAT_DIR/amps

# Does not work to use modules dir, no virtual web app loader config for tomcat
# RUN mkdir -p $TOMCAT_DIR/modules/platform

COPY target/user-session-management-platform-1.0-SNAPSHOT.amp $TOMCAT_DIR/amps
# COPY target/jars $TOMCAT_DIR/modules/platform
# COPY target/user-session-management-platform-1.0-SNAPSHOT.jar $TOMCAT_DIR/webapps/alfresco/WEB-INF/lib

RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
              $TOMCAT_DIR/amps $TOMCAT_DIR/webapps/alfresco -directory -nobackup -force
