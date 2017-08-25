// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using Microsoft.Portal.Framework;
using Newtonsoft.Json;

namespace Microsoft.Portal.Extensions.Microsoft_Azure_Nginx.Controllers
{
    [Export(typeof(ExtensionDefinition))]
    internal class Definition : ExtensionDefinition
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Definition"/> class.
        /// </summary>
        /// <param name="applicationConfiguration">The application configuration.</param>
        [ImportingConstructor]
        public Definition(ApplicationConfiguration applicationConfiguration)
        {
            this.EnablePortalLogging = true;
            this.ExtensionConfiguration = new Dictionary<string, object>()
            {
                { "armEndpoint", applicationConfiguration.ArmEndpoint },
            };
#if DEBUG

            var dirName = Path.GetDirectoryName(new Uri(Assembly.GetExecutingAssembly().CodeBase).LocalPath);
            var paths = GetPrefixes(applicationConfiguration.TestInProdEnvironment).Select(x => Path.Combine(dirName, @"../Content/Config", x + ".json"));
            var configFilePath = paths.First(File.Exists);
            var overrides = JsonConvert.DeserializeObject<Dictionary<string, object>>(File.ReadAllText(configFilePath));
            var debugConfiguration = new Dictionary<string, object>();

            foreach (var key in this.ExtensionConfiguration.Keys)
            {
                debugConfiguration[key] = overrides[key];
            }

            this.ExtensionConfiguration = debugConfiguration;
        }

        public static IEnumerable<string> GetPrefixes(string url)
        {
            const string schemeEnd = "://";
            var schemeEndIndex = url.IndexOf(schemeEnd);
            if (schemeEndIndex > -1)
            {
                url = url.Substring(schemeEndIndex + schemeEnd.Length);
            }

            var split = url.Split('.');
            return split.Select((cur, i) => string.Join(".", split.Skip(i)));
#endif
        }

        public override ExtensionIFrameCacheability Cacheability
        {
            get
            {
                return ExtensionIFrameCacheability.Manifest;
            }
        }

        public override string GetTitle(PortalRequestContext context)
        {
            return Client.ClientResources.ExtensionName;
        }
 
        public override bool TraceAjaxErrors
        {
            get
            {
                return true;
            }
        }
   }
}