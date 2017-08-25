﻿//------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//------------------------------------------------------------

using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.Portal.Extensions.Microsoft_Azure_Nginx.Controllers;
using Microsoft.Portal.Framework.ExtensionCore;

namespace Microsoft.Portal.Extensions.Microsoft_Azure_Nginx
{
    /// <summary>
    /// An http application
    /// </summary>
    public class MvcApplication : ExtensionApplicationBase
    {
        /// <summary>
        /// Calls when the application starts for the first time
        /// </summary>
        protected override void ApplicationStartHandler()
        {
            // remove the below call to the base method if you do not want to register the <c>PrecompiledMvcViewEngine</c> view engine.
            base.ApplicationStartHandler();

            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
