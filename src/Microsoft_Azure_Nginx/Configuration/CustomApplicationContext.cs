// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

using System.ComponentModel.Composition;
using Microsoft.Portal.Framework;
using System.Reflection;
using System.IO;
using System;

namespace Microsoft.Portal.Extensions.Microsoft_Azure_Nginx
{
    [Export(typeof(ApplicationContext))]
    internal class CustomApplicationContext : ApplicationContext
    {
        const int PeHeaderOffset = 60;
        const int LinkerTimestampOffset = 8;
        private ApplicationConfiguration configuration;

        [ImportingConstructor]
        public CustomApplicationContext(ApplicationConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public override bool IsDevelopmentMode
        {
            get
            {
                return this.configuration.IsDevelopmentMode;
            }
        }

        public override string Version
        {
            get
            {
                var vstsBuildVersion = Environment.GetEnvironmentVariable("BUILD_BUILDNUMBER");
                if (!string.IsNullOrWhiteSpace(vstsBuildVersion))
                {
                    return vstsBuildVersion;
                }

                // We need this to autoincrement when we release new hotfixes to make CDN refresh...
                // And it also plays into ExtensionDefinition.Cacheability
                // Look up the linker timestamp of the current assembly and make that our assembly minor version.
                var filePath = Assembly.GetExecutingAssembly().Location;
                using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    byte[] b = new byte[2048];
                    stream.Read(b, 0, 2048);
                    var offset = BitConverter.ToInt32(b, PeHeaderOffset);
                    var timestamp = BitConverter.ToInt32(b, offset + LinkerTimestampOffset);
                    var versionString = "1.0." + timestamp.ToString();
                    return versionString;
                }
            }
        }
    }
}
