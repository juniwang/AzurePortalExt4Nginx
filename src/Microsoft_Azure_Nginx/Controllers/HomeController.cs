// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Portal.Framework;

namespace Microsoft.Portal.Extensions.Microsoft_Azure_Nginx.Controllers
{
    /// <summary>
    /// Home controller
    /// </summary>
    [Export]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class HomeController : ExtensionControllerBase
    {
        private ApplicationConfiguration settings;
        /// <summary>
        /// Initializes a new instance of the HomeController class.
        /// </summary>
        [ImportingConstructor]
        public HomeController(ExtensionDefinition definition, ApplicationConfiguration settings)
            : base(definition)
        {
            this.settings = settings;
        }

        public override ActionResult Index()
        {
            if (settings.IsDevelopmentMode && Request.QueryString.Count == 0)
            {
                Response.Redirect(string.Format("{0}/?Microsoft_Azure_Nginx_noInvoke=true&feature.showassettypes=Microsoft_Azure_Nginx_Project&feature.canmodifyextensions=true#?testExtensions={{\"Microsoft_Azure_Nginx\":\"{1}\"}}", this.settings.TestInProdEnvironment, Request.Url.ToString()));
                return null;
            }

            return base.Index();
        }
    }
}