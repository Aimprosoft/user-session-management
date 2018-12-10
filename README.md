Authenticated user managing component for Alfresco 5.x
===============================================================

This project contains a react application for managing logged in users.

Building 
--------

To build the module and its AMP / JAR files, run the following command from the base
project directory:

    mvn clean install

The command builds JAR files named `user-session-management-share-<version>.jar`/`user-session-management-share-<version>.amp`,
`user-session-management-platform-<version>.jar`/`user-session-management-platform-<version>.amp`
  into `<project-directory>/user-session-management-module/user-session-management-platform/target/` and 
  `<project-directory>/user-session-management-module/user-session-management-share/target/` directories.

Installation 
------------

Use alfresco built-in tools to deploy plugin, 
[Alfresco install AMP](http://docs.alfresco.com/5.0/tasks/dev-extensions-tutorials-simple-module-install-amp.html)

Using the component
-------------------

- change host configuration for your react server (in AlfrescoApiBean.js), for example http://localhost:3000
- Run react application (execute command `npm start` in `<project-directory>/user-session-management-react`)
- go to (`localhost:3000`) and log into react application with administrator permissions
- In home page you can see logged into share grouped by type
- Go to page active users
- Logout any users session
