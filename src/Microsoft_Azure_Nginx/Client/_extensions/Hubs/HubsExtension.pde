{
  "extension": "HubsExtension",
  "version": "1.0",
  "sdkVersion": "5.0.302.813 (production_sdk#17c60b9.170725-1208)",
  "schemaVersion": "1.0.0.2",
  "assetTypes": [
    {
      "name": "ArmExplorer",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseAll",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseAllWithType",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseService",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseDynamicAsset",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseDynamicResource",
      "permissions": [],
      "links": null
    },
    {
      "name": "NonAssetResource",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseInstanceLink",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseResource",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseAllResources",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseRecentResources",
      "permissions": [],
      "links": null
    },
    {
      "name": "BrowseResourceGroup",
      "permissions": [],
      "links": null
    },
    {
      "name": "ActiveDirectoryMfaPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "ActiveDirectoryRmsPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "ApiManagementPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "BackupPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "BizTalkServicePlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "CdnPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "EventHubPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "MarketplaceAddOnPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "MediaServicePlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "MobileServicePlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "RemoteAppPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "ServiceBusPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "SiteRecoveryPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "StorSimplePlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "StreamAnalyticsPlaceholder",
      "permissions": [],
      "links": null
    },
    {
      "name": "AccountPortalSearchResult",
      "permissions": [],
      "links": null
    },
    {
      "name": "WhatsNew",
      "permissions": [],
      "links": null
    },
    {
      "name": "Deployments",
      "permissions": [],
      "links": null
    },
    {
      "name": "ResourceGroups",
      "permissions": [
        {
          "Name": "read",
          "Action": "Microsoft.Resources/subscriptions/resourceGroups/read"
        },
        {
          "Name": "deleteObject",
          "Action": "Microsoft.Resources/subscriptions/resourceGroups/delete"
        },
        {
          "Name": "write",
          "Action": "Microsoft.Resources/subscriptions/resourceGroups/write"
        },
        {
          "Name": "writeDeployments",
          "Action": "Microsoft.Resources/subscriptions/resourceGroups/deployments/write"
        },
        {
          "Name": "readDeployments",
          "Action": "Microsoft.Resources/subscriptions/resourceGroups/deployments/read"
        },
        {
          "Name": "readEvents",
          "Action": "Microsoft.Insights/events/read"
        }
      ],
      "links": null
    },
    {
      "name": "ResourceGroupEvents",
      "permissions": [],
      "links": null
    },
    {
      "name": "Settings",
      "permissions": [],
      "links": null
    },
    {
      "name": "Tag",
      "permissions": [],
      "links": null
    },
    {
      "name": "Dashboard",
      "permissions": [],
      "links": null
    }
  ],
  "parts": [
    {
      "name": "BrowseServicePart",
      "inputs": [
        "assetTypeId"
      ],
      "commandBindings": [],
      "initialSize": 2
    },
    {
      "name": "BrowseServiceListPart",
      "inputs": [
        "assetTypeId"
      ],
      "commandBindings": [],
      "initialSize": 8
    },
    {
      "name": "BrowseServiceListPartWithCookie",
      "inputs": [
        "assetTypeId",
        "cookie"
      ],
      "commandBindings": [],
      "initialSize": 8
    },
    {
      "name": "Resources",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 8,
      "supportedSizes": []
    },
    {
      "name": "ResourceGroupMapPart",
      "inputs": [
        "resourceGroup"
      ],
      "commandBindings": [],
      "initialSize": 5
    },
    {
      "name": "ResourceMapPart",
      "inputs": [
        "assetOwner",
        "assetType",
        "assetId"
      ],
      "commandBindings": [],
      "initialSize": 5
    },
    {
      "name": "DiagnosticsTile",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 1
    },
    {
      "name": "WhatsNewTile",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 2
    },
    {
      "name": "FeedbackTile",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 0
    },
    {
      "name": "ServicesHealthPart",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 5,
      "supportedSizes": [
        0,
        1,
        2,
        3,
        4,
        10,
        5
      ]
    },
    {
      "name": "SpecPickerListViewPart",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 9,
      "supportedSizes": []
    },
    {
      "name": "PricingTierLauncher",
      "inputs": [
        "entityId"
      ],
      "commandBindings": [],
      "initialSize": 3,
      "supportedSizes": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "name": "SpecComparisonPart",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 8,
      "supportedSizes": []
    },
    {
      "name": "SpecPickerListViewPartV3",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 9,
      "parameterProvider": true,
      "supportedSizes": []
    },
    {
      "name": "SpecPickerGridViewPartV3",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 9,
      "parameterProvider": true,
      "supportedSizes": []
    },
    {
      "name": "PricingTierLauncherV3",
      "inputs": [
        "entityId"
      ],
      "commandBindings": [],
      "initialSize": 3,
      "supportedSizes": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "name": "ResourceFilterPart",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 8,
      "supportedSizes": []
    },
    {
      "name": "ResourceTagsPart",
      "inputs": [
        "resourceId"
      ],
      "commandBindings": [],
      "initialSize": null
    },
    {
      "name": "GettingStartedPart",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 99,
      "initialHeight": 5,
      "initialWidth": 4,
      "supportedSizes": []
    },
    {
      "name": "MonitorChartPart",
      "inputs": [],
      "commandBindings": [],
      "initialSize": 5,
      "typeScriptMetadata": {
        "ParametersTypeExpression": {
          "TypeExpression": "HubsExtension.MonitorChartPart.Parameters"
        }
      },
      "supportedSizes": [
        3,
        4,
        10,
        5,
        6
      ]
    }
  ],
  "partTypeScriptDependencies": {
    "DefinitionFileNames": [],
    "Modules": null
  },
  "blades": [
    {
      "name": "UnauthorizedAssetBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": []
    },
    {
      "name": "NotFoundAssetBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": []
    },
    {
      "name": "UnavailableAssetBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": []
    },
    {
      "name": "Resources",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [
        "resourceType",
        "selectedSubscriptionId",
        "filter",
        "scope",
        "kind"
      ],
      "outputs": []
    },
    {
      "name": "BrowseAllResourcesBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [
        "resourceType",
        "selectedSubscriptionId",
        "filter",
        "scope",
        "kind"
      ],
      "outputs": []
    },
    {
      "name": "BrowseResourceBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [
        "resourceType",
        "selectedSubscriptionId",
        "filter",
        "scope",
        "kind"
      ],
      "outputs": []
    },
    {
      "name": "BrowseInstanceLinkBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [
        "resourceType",
        "selectedSubscriptionId",
        "filter",
        "scope",
        "kind"
      ],
      "outputs": []
    },
    {
      "name": "BrowseResourceGroupBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [
        "resourceType",
        "selectedSubscriptionId",
        "filter",
        "scope",
        "kind"
      ],
      "outputs": []
    },
    {
      "name": "MapResourceGroupBlade",
      "keyParameters": [],
      "inputs": [
        "id"
      ],
      "optionalInputs": [],
      "outputs": []
    },
    {
      "name": "ResourceGroupPickerV3Blade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": [],
      "parameterProvider": true
    },
    {
      "name": "DeployFromTemplateBlade",
      "keyParameters": [],
      "inputs": [
        "internal_bladeCallerParams"
      ],
      "optionalInputs": [],
      "outputs": [],
      "parameterProvider": true
    },
    {
      "name": "ParametersEditorBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": [],
      "parameterProvider": true
    },
    {
      "name": "ParametersFileEditorBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": [],
      "parameterProvider": true
    },
    {
      "name": "TemplateEditorBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": [],
      "parameterProvider": true
    },
    {
      "name": "LocationPickerV3Blade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": [],
      "parameterProvider": true
    },
    {
      "name": "DeploymentDetailsBlade",
      "keyParameters": [
        "id"
      ],
      "inputs": [
        "id"
      ],
      "optionalInputs": [
        "referrerInfo"
      ],
      "outputs": []
    },
    {
      "name": "ResourceGroupMapBlade",
      "keyParameters": [
        "id"
      ],
      "inputs": [
        "id"
      ],
      "optionalInputs": [],
      "outputs": []
    },
    {
      "name": "ResourceMenuBlade",
      "keyParameters": [],
      "inputs": [
        "id"
      ],
      "optionalInputs": [
        "menuid",
        "referrerInfo"
      ],
      "outputs": []
    },
    {
      "name": "ServicesHealthBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": []
    },
    {
      "name": "SettingsBlade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": []
    },
    {
      "name": "SubscriptionPickerV3Blade",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": [],
      "parameterProvider": true
    },
    {
      "name": "DeployToAzure",
      "keyParameters": [],
      "inputs": [],
      "optionalInputs": [],
      "outputs": [],
      "parameterProvider": true
    }
  ],
  "bladeTypeScriptDependencies": {
    "DefinitionFileNames": [],
    "Modules": null
  },
  "commands": [
    {
      "name": "MoveResourceCommand",
      "inputs": [
        "resourceId"
      ]
    }
  ],
  "controls": []
}