// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

using System.ComponentModel.Composition;
using Microsoft.Portal.Framework;

namespace Microsoft.Portal.Extensions.Microsoft_Azure_Nginx
{
    /// <summary>
    /// Represents application configuration settings.
    /// </summary>
    [Export(typeof(ApplicationConfiguration))]
    public class ApplicationConfiguration : ConfigurationSettings
    {
        /// <summary>
        /// Gets a value indicating whether development mode is enabled. Development mode turns minification off.
        /// </summary>
        /// <remarks>Development mode turns minification off. It also disables any caching that be happening.</remarks>
        [ConfigurationSetting]
        public bool IsDevelopmentMode { get; private set; }

        /// <summary>
        /// Gets the test in prod host environment to side load the extension in
        /// </summary>
        [ConfigurationSetting]
        public string TestInProdEnvironment { get; private set; }

        /// <summary>
        /// Gets the ARM endpoint
        /// </summary>
        [ConfigurationSetting]
        public string ArmEndpoint { get; private set; }
    }
}