<#escape x as jsonUtils.encodeJSONString(x)>
{
"users":[
<#if usersWithTicket??>
    <#list usersWithTicket as user>
        {
            "id": "${user.userName}",
            "firstName": "${user.firstName}",
            "lastName": "${user.lastName}",
            "fullName": "${user.firstName} ${user.lastName}",
            "isActive": "true"
        }
    <#if user_has_next>,</#if>
    </#list>
</#if>
]
}
</#escape>