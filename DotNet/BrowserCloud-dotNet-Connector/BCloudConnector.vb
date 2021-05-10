


Public Class BCloudConnector

    Private _browserCloudUrl As String = Nothing

    Public Sub New(Optional browserCloudUrl As String = "https://prod-browsercloud-in.pcloudy.com")
        _browserCloudUrl = browserCloudUrl
    End Sub

    Public Function authenticateUser(pCloudyEndpoint As String, userEmail As String, pCloudyAccessKey As String) As String
        Dim url = String.Format("{0}/api/authenticateWithBrowserCloud.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"pCloudyEndpoint": "@pCloudyEndpoint",
                                "userEmail": "@userEmail",
                                "pCloudyAccessKey": "@pCloudyAccessKey"}
                           </json>.Value.Trim

        jsonData = jsonData.Replace("@pCloudyEndpoint", pCloudyEndpoint)
        jsonData = jsonData.Replace("@userEmail", userEmail)
        jsonData = jsonData.Replace("@pCloudyAccessKey", pCloudyAccessKey)

        Dim p = callService(Of AuthenticateResponseDTO)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New UnauthorizedAccessException(p.result.error)

        Return p.result.browserCloudAuthToken
    End Function


    Public Function authenticateUser(userEmail As String, browserCloudAccessKey As String) As String
        Dim url = String.Format("{0}/api/authenticateClient.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"clientName": "@clientName",
                                "apiKey": "@apiKey"}
                           </json>.Value.Trim

        jsonData = jsonData.Replace("@clientName", userEmail)
        jsonData = jsonData.Replace("@apiKey", browserCloudAccessKey)

        Dim p = callService(Of AuthenticateResponseDTO)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New UnauthorizedAccessException(p.result.error)

        Return p.result.browserCloudAuthToken
    End Function


    Public Function getAvailableBrowsers(browserCloudAuthToken As String) As AvailableBrowsersResponse.BrowserInstance()
        Dim url = String.Format("{0}/api/getAvailableBrowsers.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"browserCloudAuthToken": "@browserCloudAuthToken"}
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)

        Dim p = callService(Of AvailableBrowsersResponse)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result.instances
    End Function

    Public Function getPreferredBrowser(browserCloudAuthToken As String, OS_Name As String, OS_Version As String, BrowserName As String, BrowserVersion As String) As AvailableBrowsersResponse.BrowserInstance
        Dim allInstances = Me.getAvailableBrowsers(browserCloudAuthToken)
        For Each itm In allInstances
            If itm.status <> "available" Then Continue For
            If itm.SystemOS.OSName = OS_Name AndAlso itm.SystemOS.OSVersion = OS_Version Then
                For Each browser In itm.browsersDetails
                    If browser.browserName = BrowserName AndAlso getBrowserMajorVersion(browser.browserVersion) = getBrowserMajorVersion(BrowserVersion) Then
                        Return itm
                    End If
                Next
            End If


        Next

        Throw New BrowserCloudError("Unable to find browser with the given criteria. It may have been booked by someone else")
    End Function

    Private Function getBrowserMajorVersion(browserVersion As String) As String
        If (browserVersion.Contains(".")) Then

            Return browserVersion.Split("."c)(0)

        Else
            Return browserVersion
        End If
    End Function

    Public Enum SessionType_ENUM
        manual
        automation
        opkey
    End Enum

    Public Function bookBrowser(browserCloudAuthToken As String, instance_id As String, OSName As String, OSVersion As String,
                                browserName As String, browserVersion As String, browserArchitecture As String, userEmail As String, session_type As SessionType_ENUM, session_name As String) As BookBrowserResponse.BookBrowserResponseResult
        'isset($POST_JSON['browserCloudAuthToken']) && isset($POST_JSON['instance_id']) && isset($POST_JSON['systemOS']) && isset($POST_JSON['browserDetails']) && isset($POST_JSON['userEmail']) && isset($POST_JSON['session_type']) && isset($POST_JSON['session_name']))
        Dim url = String.Format("{0}/api/bookBrowser.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"browserCloudAuthToken": "@browserCloudAuthToken",
                                "instance_id": "@instance_id",
                                "systemOS": {"OSName":"@OSName", "OSVersion":"@OSVersion" },
                                "browserDetails": {"browserName":"@browserName", "browserVersion":"@browserVersion", "browserArchitecture":"@browserArchitecture"},
                                "userEmail": "@userEmail",
                                "session_type": "@session_type",
                                "session_name": "@session_name"}
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
        jsonData = jsonData.Replace("@instance_id", instance_id)
        jsonData = jsonData.Replace("@OSName", OSName)
        jsonData = jsonData.Replace("@OSVersion", OSVersion)
        jsonData = jsonData.Replace("@browserName", browserName)
        jsonData = jsonData.Replace("@browserVersion", browserVersion)
        jsonData = jsonData.Replace("@browserArchitecture", browserArchitecture)
        jsonData = jsonData.Replace("@userEmail", userEmail)
        jsonData = jsonData.Replace("@session_type", session_type.ToString)
        jsonData = jsonData.Replace("@session_name", session_name)


        Dim p = callService(Of BookBrowserResponse)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function

    Public Function releaseBrowser(browserCloudAuthToken As String, instance_id As String) As ReleaseBrowserResponseDTO.ReleaseBrowserResponseResultDTO
        Dim url = String.Format("{0}/api/releaseBrowser.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"browserCloudAuthToken": "@browserCloudAuthToken",
                                "instance_id": "@instance_id"}
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
        jsonData = jsonData.Replace("@instance_id", instance_id)


        Dim p = callService(Of ReleaseBrowserResponseDTO)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function

    Public Function initiateOpKeySpockClientUtility(browserCloudAuthToken As String, instance_id As String, userEmail As String,
                                                    Spock_Client_Id As String,
                                                    Spock_ClientName As String, Spock_ServerURL As String,
                                                    Spock_Username As String, Spock_APIKey As String) As InitiateOpKeySpockClientUtilityResponseDTO.InitiateOpKeySpockClientUtilityResponseResult
        Dim url = String.Format("{0}/api/initiateOpKeySpockClientUtility.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"browserCloudAuthToken": "@browserCloudAuthToken",
                                "instance_id": "@instance_id",
                                "userEmail": "@userEmail",
                                "Spock_Client_Id": "@Spock_Client_Id",
                                "Spock_ClientName": "@Spock_ClientName",
                                "Spock_ServerURL": "@Spock_ServerURL",
                                "Spock_Username": "@Spock_Username",
                                "Spock_APIKey": "@Spock_APIKey"}
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
        jsonData = jsonData.Replace("@instance_id", instance_id)
        jsonData = jsonData.Replace("@userEmail", userEmail)
        jsonData = jsonData.Replace("@Spock_Client_Id", Spock_Client_Id)
        jsonData = jsonData.Replace("@Spock_ClientName", Spock_ClientName)
        jsonData = jsonData.Replace("@Spock_ServerURL", Spock_ServerURL)
        jsonData = jsonData.Replace("@Spock_Username", Spock_Username.ToString)
        jsonData = jsonData.Replace("@Spock_APIKey", Spock_APIKey)


        Dim p = callService(Of InitiateOpKeySpockClientUtilityResponseDTO)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function


    Public Function initiateScreenSharing(browserCloudAuthToken As String, instance_id As String, userEmail As String) As InitiateScreenSharingResponse.InitiateScreenSharingResponseResult
        Dim url = String.Format("{0}/api/initiateScreenSharing.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"browserCloudAuthToken": "@browserCloudAuthToken",
                                "instance_id": "@instance_id",
                                "userEmail": "@userEmail"}
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
        jsonData = jsonData.Replace("@instance_id", instance_id)
        jsonData = jsonData.Replace("@userEmail", userEmail)



        Dim p = callService(Of InitiateScreenSharingResponse)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function

    Public Function setResolution(browserCloudAuthToken As String, instance_id As String, userEmail As String, width As Integer, height As Integer) As SetResolutionResponse.SetResolutionResponseResult
        Dim url = String.Format("{0}/api/setResolution.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"browserCloudAuthToken": "@browserCloudAuthToken",
                                "instance_id": "@instance_id",
                                "userEmail": "@userEmail",
                                "width": "@width",
                                "height": "@height"}
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
        jsonData = jsonData.Replace("@instance_id", instance_id)
        jsonData = jsonData.Replace("@userEmail", userEmail)
        jsonData = jsonData.Replace("@width", width)
        jsonData = jsonData.Replace("@height", height)



        Dim p = callService(Of SetResolutionResponse)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function

    Public Function getResolution(browserCloudAuthToken As String, instance_id As String, userEmail As String) As GetResolutionResponse.GetResolutionResponseResult
        Dim url = String.Format("{0}/api/setResolution.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"browserCloudAuthToken": "@browserCloudAuthToken",
                                "instance_id": "@instance_id",
                                "userEmail": "@userEmail"}
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
        jsonData = jsonData.Replace("@instance_id", instance_id)
        jsonData = jsonData.Replace("@userEmail", userEmail)




        Dim p = callService(Of GetResolutionResponse)(url, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function
End Class
