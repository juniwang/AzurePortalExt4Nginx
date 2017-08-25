//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------

using System.Web;
using System.Web.Mvc;

namespace Microsoft.Portal.Extensions.Microsoft_Azure_Nginx
{
    /// <summary>
    /// Contains the configuration for the Filter
    /// </summary>
    public class FilterConfig
    {
        /// <summary>
        /// Registers the global filters
        /// </summary>
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}