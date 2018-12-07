FROM alfresco/alfresco-share:6.0.c

ARG TOMCAT_DIR=/usr/local/tomcat

RUN mkdir -p $TOMCAT_DIR/amps_share

# Does not work to use modules dir, no virtual web app loader config for tomcat
# RUN mkdir -p $TOMCAT_DIR/modules/share

COPY target/user-session-management-share-1.0-SNAPSHOT.amp $TOMCAT_DIR/amps_share
# COPY target/jars $TOMCAT_DIR/modules/share
# COPY target/user-session-management-share-1.0-SNAPSHOT.jar $TOMCAT_DIR/webapps/share/WEB-INF/lib

RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
              $TOMCAT_DIR/amps_share $TOMCAT_DIR/webapps/share -directory -nobackup -force
