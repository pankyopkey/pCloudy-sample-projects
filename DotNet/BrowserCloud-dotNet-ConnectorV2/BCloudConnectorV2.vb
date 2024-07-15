﻿


Imports System.IO
Imports System.Linq
Imports System.Net
Imports System.Net.WebRequestMethods
Imports System.Security.Cryptography
Imports com.ssts.pcloudy.browsercloud.AvailableBrowsersResponse
Imports Newtonsoft
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq

Public Class BCloudConnectorV2

    Private _browserCloudUrl As Uri = Nothing
    Private _browserCloudAuthUrl As String = Nothing
    Private _opkeyBaseUrl As String = Nothing


    Public Sub New(opkeyBaseUrl As String)
        _opkeyBaseUrl = opkeyBaseUrl
        Dim fullUrl As String = opkeyBaseUrl & "/pcloudy/browser_cloud"
        Dim fullAuthUrl As String = opkeyBaseUrl
        _browserCloudUrl = New Uri(fullUrl)
        _browserCloudAuthUrl = fullAuthUrl

    End Sub



    Public Function authenticateUser(userEmail As String, pCloudyAccessKey As String) As String
        '  Dim url = String.Format("{0}/pcloudy/api/access", _browserCloudUrl)
        Dim url As String = String.Format("{0}/pcloudy/api/access?userEmail={1}&pCloudyAccessKey={2}", _browserCloudAuthUrl, Uri.EscapeDataString(userEmail), Uri.EscapeDataString(pCloudyAccessKey))
        _webClient.Headers.Clear()
        _webClient.Headers(HttpRequestHeader.Authorization) = $"Basic {EncodeToBase64($"{userEmail}:{pCloudyAccessKey}")}"
        _webClient.Headers(HttpRequestHeader.ContentType) = "application/json"

        Try

            Dim responseString = _webClient.DownloadString(url)
            Dim p = Newtonsoft.Json.JsonConvert.DeserializeObject(Of AuthenticateResponseDTO)(responseString)

            If p.result IsNot Nothing AndAlso p.result.error IsNot Nothing Then
                Throw New UnauthorizedAccessException(p.result.error)
            End If

            Return p.result.token
        Catch ex As WebException When ex.Response IsNot Nothing
            Dim resp = New StreamReader(ex.Response.GetResponseStream()).ReadToEnd()
            Console.WriteLine("Error Response: " & resp)
            Throw
        Catch ex As Exception
            Console.WriteLine("Exception: " & ex.ToString())
            Throw
        End Try
    End Function


    Private Function EncodeToBase64(text As String) As String
        Dim textBytes As Byte() = System.Text.Encoding.UTF8.GetBytes(text)
        Return Convert.ToBase64String(textBytes)
    End Function



    'Public Function getAvailableBrowsers(browserCloudAuthToken As String, VMID As String)
    '    Dim encodedVMID As String = Uri.EscapeDataString(VMID)
    '    Dim url = String.Format("{0}/api/v1/" + encodedVMID + "/get-browsers", _browserCloudUrl)

    '    Dim p As BrowserDTO = callServiceGet(Of BrowserDTO)(url, browserCloudAuthToken, _opkeyBaseUrl)
    '    Dim browserData As Dictionary(Of String, List(Of String)) = p.data


    '    Return browserData
    'End Function


    Public Function getAvailableBrowsers(browserCloudAuthToken As String, VMID As String) As Dictionary(Of String, List(Of String))
        Dim encodedVMID As String = Uri.EscapeDataString(VMID)
        Dim url = String.Format("{0}/api/v1/" + encodedVMID + "/get-browsers", _browserCloudUrl)

        Dim p As BrowserDTO = callServiceGet(Of BrowserDTO)(url, browserCloudAuthToken, _opkeyBaseUrl)
        Return p.data
    End Function


    'Public Function getAppropriateVmList(token As String, OS_Name As String, OS_Version As String, BrowserName As String, BrowserVersion As String) As List(Of VmDetails)
    '    Dim allVms = Me.GetAllVms(token)
    '    Dim matchingVms As New List(Of VmDetails)

    '    For Each vmDetail In allVms
    '        If Not vmDetail.isBooked AndAlso vmDetail.os = OS_Name AndAlso vmDetail.osVer = OS_Version Then
    '            If vmDetail.browser.ContainsKey(BrowserName) AndAlso vmDetail.browser(BrowserName).Contains(BrowserVersion) Then
    '                matchingVms.Add(vmDetail)
    '            End If
    '        End If
    '    Next

    '    If matchingVms.Count > 0 Then
    '        Return matchingVms
    '    Else
    '        Throw New Exception("No available VM found with the specified browser.")
    '    End If
    'End Function

    Public Function getAppropriateVmTest(token As String, OS_Name As String, OS_Version As String, BrowserName As String, BrowserVersion As String) As VmDetails

        Dim allVms = Me.GetAllVms(token)
        For Each vmDetail In allVms
            If vmDetail.os = OS_Name AndAlso vmDetail.osVer = OS_Version AndAlso
           vmDetail.browser.ContainsKey(BrowserName) AndAlso vmDetail.browser(BrowserName).Contains(BrowserVersion) Then
                If Not vmDetail.isBooked Then
                    Return vmDetail
                End If
            End If
        Next
        Throw New BrowserCloudVmNotFoundError("No available VM found with the specified browser or all suitable VMs are booked.")
    End Function




    Public Function getAppropriateVm(token As String, OS_Name As String, OS_Version As String, BrowserName As String, BrowserVersion As String) As VmDetails
        Dim allVms = Me.GetAllVms(token)
        For Each vmDetail In allVms
            If Not vmDetail.isBooked AndAlso vmDetail.os = OS_Name AndAlso vmDetail.osVer = OS_Version Then
                If vmDetail.browser.ContainsKey(BrowserName) AndAlso vmDetail.browser(BrowserName).Contains(BrowserVersion) Then
                    Return vmDetail
                End If
            End If
        Next
        Throw New BrowserCloudVmNotFoundError("No available VM found with the specified browser.")
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

    'Public Function bookBrowser(browserCloudAuthToken As String, instance_id As String, OSName As String, OSVersion As String,
    '                            browserName As String, browserVersion As String, browserArchitecture As String, userEmail As String, session_type As SessionType_ENUM, session_name As String) As BookBrowserResponse.BookBrowserResponseResult
    '    'isset($POST_JSON['browserCloudAuthToken']) && isset($POST_JSON['instance_id']) && isset($POST_JSON['systemOS']) && isset($POST_JSON['browserDetails']) && isset($POST_JSON['userEmail']) && isset($POST_JSON['session_type']) && isset($POST_JSON['session_name']))
    '    Dim url = String.Format("{0}/api/bookBrowser.php", _browserCloudUrl)
    '    Dim jsonData = <json>
    '                           {"browserCloudAuthToken": "@browserCloudAuthToken",
    '                            "instance_id": "@instance_id",
    '                            "systemOS": {"OSName":"@OSName", "OSVersion":"@OSVersion" },
    '                            "browserDetails": {"browserName":"@browserName", "browserVersion":"@browserVersion", "browserArchitecture":"@browserArchitecture"},
    '                            "userEmail": "@userEmail",
    '                            "session_type": "@session_type",
    '                            "session_name": "@session_name"}
    '                       </json>.Value.Trim


    '    jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
    '    jsonData = jsonData.Replace("@instance_id", instance_id)
    '    jsonData = jsonData.Replace("@OSName", OSName)
    '    jsonData = jsonData.Replace("@OSVersion", OSVersion)
    '    jsonData = jsonData.Replace("@browserName", browserName)
    '    jsonData = jsonData.Replace("@browserVersion", browserVersion)
    '    jsonData = jsonData.Replace("@browserArchitecture", browserArchitecture)
    '    jsonData = jsonData.Replace("@userEmail", userEmail)
    '    jsonData = jsonData.Replace("@session_type", session_type.ToString)
    '    jsonData = jsonData.Replace("@session_name", session_name)


    '    Dim p = callService(Of BookBrowserResponse)(url, jsonData)
    '    If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

    '    Return p.result
    'End Function

    Public Function bookVm(browserCloudAuthToken As String, VMID As String, browser As String, version As String) As String

        Dim url = String.Format("{0}/api/v1/" + VMID + "/book", _browserCloudUrl)
        Dim jsonData = <json>
                           {"browser":"@browser", "version":"@version", "automationType": "opkey"}
                       </json>.Value.Trim

        jsonData = jsonData.Replace("@browser", browser)
        jsonData = jsonData.Replace("@version", version)
        Dim p As ApiResponse
        Try
            p = callServicePostBookVm(Of ApiResponse)(url, browserCloudAuthToken, jsonData, _opkeyBaseUrl)
            ' Assuming the first booking detail contains the desired booking_id
            Return p.result.data.bookingDetails(0).booking_id
        Catch ex As BrowserCloudBookingError
            Throw
        Catch ex As Exception
            Throw New Exception("An error occurred during booking: " + ex.Message)
        End Try

    End Function


    Public Function releaseVm(browserCloudAuthToken As String, VMID As String, bookingId As String) As ReleaseBrowserResponseDTO.ReleaseBrowserResponseResultDTO
        Dim url = String.Format("{0}/api/v1/" + VMID + "/release", _browserCloudUrl)
        Dim jsonData = <json>
                               {"bookingId": "@bookingId"} 
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@bookingId", bookingId)

        Dim p = callServicePost(Of ReleaseBrowserResponseDTO)(url, browserCloudAuthToken, jsonData, _opkeyBaseUrl)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function


    'Public Function initiateOpKeySpockTeleportingTunnel(browserCloudAuthToken As String, instance_id As String, userEmail As String,
    '                                                Spock_Token As String) As InitiateOpKeySpockTeleportingTunnelResponseDTO.InitiateOpKeySpockTeleportingTunnelResponseResult
    '    Dim url = String.Format("{0}/api/initiateOpKeySpockTeleportingTunnel.php", _browserCloudUrl)
    '    Dim jsonData = <json>
    '                           {"browserCloudAuthToken": "@browserCloudAuthToken",
    '                            "instance_id": "@instance_id",
    '                            "userEmail": "@userEmail",
    '                            "Spock_Token": "@Spock_Token"
    '                           }
    '                       </json>.Value.Trim


    '    jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
    '    jsonData = jsonData.Replace("@instance_id", instance_id)
    '    jsonData = jsonData.Replace("@userEmail", userEmail)
    '    jsonData = jsonData.Replace("@Spock_Token", Spock_Token)



    '    Dim p = callService(Of InitiateOpKeySpockTeleportingTunnelResponseDTO)(url, jsonData)
    '    If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

    '    Return p.result
    'End Function

    Public Function initiateDotNetCoreAgent(browserCloudAuthToken As String, VMID As String, browser As String, version As String, bookingId As String) As AgentResponseDTO.AgentResponseResult
        Dim url = String.Format("{0}/api/v1/" + VMID + "/start-opkey-agent", _browserCloudUrl)
        Dim jsonData = <json>
                    {"browser":"@browser", "version":"@version", "bookingId": "@bookingId"}
                </json>.Value.Trim

        jsonData = jsonData.Replace("@browser", browser)
        jsonData = jsonData.Replace("@version", version)
        jsonData = jsonData.Replace("@bookingId", bookingId)

        Dim p = callServicePost(Of AgentResponseDTO)(url, browserCloudAuthToken, jsonData, _opkeyBaseUrl)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function


    Public Function registerDotNetCoreAgent(browserCloudAuthToken As String, VMID As String, serverUrl As String, browserCloudAgentId As String, browserCloudAgentName As String, userName As String, apiKey As String, bookingId As String) As AgentResponseDTO.AgentResponseResult
        Dim url = String.Format("{0}/api/v1/" + VMID + "/register-opkey-agent", _browserCloudUrl)

        Dim jsonData = <json>
                               {"serverUrl": "@serverUrl",
        "browserCloudAgentId": "@browserCloudAgentId",
        "browserCloudAgentName": "@browserCloudAgentName",
        "userName": "@userName", "apiKey": "@apiKey", "bookingId": "@bookingId"} 
                           </json>.Value.Trim

        jsonData = jsonData.Replace("@serverUrl", serverUrl)
        jsonData = jsonData.Replace("@browserCloudAgentId", browserCloudAgentId)
        jsonData = jsonData.Replace("@browserCloudAgentName", browserCloudAgentName)
        jsonData = jsonData.Replace("@userName", userName)
        jsonData = jsonData.Replace("@apiKey", apiKey)
        jsonData = jsonData.Replace("@bookingId", bookingId)

        Dim p = callServicePost(Of AgentResponseDTO)(url, browserCloudAuthToken, jsonData, _opkeyBaseUrl)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function


    Public Function logoutDotNetCoreAgent(browserCloudAuthToken As String, VMID As String, bookingId As String) As AgentResponseDTO.AgentResponseResult
        Dim url = String.Format("{0}/api/v1/" + VMID + "/stop-opkey-agent", _browserCloudUrl)
        Dim jsonData = <json>
                               {"bookingId": "@bookingId"} 
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@bookingId", bookingId)

        Dim p = callServicePost(Of AgentResponseDTO)(url, browserCloudAuthToken, jsonData, _opkeyBaseUrl)
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


    Public Function setResolution(browserCloudAuthToken As String, VMID As String, width As Integer, height As Integer) As SetResolutionResponse.SetResolutionResponseResult
        Dim url = String.Format("{0}/api/v1/" + VMID + "/set-resolution", _browserCloudUrl)
        Dim jsonData = <json>
                               {
                                "width": "@width",
                                "height": "@height"}
                           </json>.Value.Trim
        jsonData = jsonData.Replace("@width", width)
        jsonData = jsonData.Replace("@height", height)

        Dim p = callServicePost(Of SetResolutionResponse)(url, browserCloudAuthToken, jsonData, _opkeyBaseUrl)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function


    'Public Function getResolution(browserCloudAuthToken As String, VMID As String) As String
    '    Dim url = String.Format("{0}/api/v1/" + VMID + "/get-resolution", _browserCloudUrl)

    '    Try
    '        Dim p = callServiceGet(Of GetResolutionResponseVm)(url, browserCloudAuthToken)
    '        If p Is Nothing Then
    '            Throw New ApplicationException("No data returned from the server.")
    '        End If

    '        Return p.resolution

    '    Catch ex As ApplicationException
    '        Console.WriteLine("error: " & ex.Message)
    '        Throw
    '    Catch ex As Exception
    '        Console.WriteLine("Unexpected error: " & ex.ToString())
    '        Throw New ApplicationException("Failed to retrieve resolution: " & ex.Message)
    '    End Try
    'End Function

    Public Function getResolution(browserCloudAuthToken As String) As List(Of String)
        ' Hardcoded list of resolutions for all VM's suggested by nishadh as Mac resolution response not working
        Dim resolutions As New List(Of String) From {
        "1920x1080",
        "1440x900",
        "1280x1024",
        "1024x768"
    }

        Return resolutions
    End Function


    Public Function GetAllVms(browserCloudAuthToken As String) As List(Of VmDetails)
        Dim url = String.Format("{0}/api/v1/get-vms", _browserCloudUrl)
        Dim httpResponse As HttpWebResponse = Nothing
        Dim responseStream As Stream = Nothing
        Dim responseBody As String = Nothing

        Dim httpRequest As HttpWebRequest = WebRequest.Create(url)
        httpRequest.Method = "POST"
        httpRequest.Headers.Add("token", browserCloudAuthToken)
        httpRequest.Headers.Add("origin", _opkeyBaseUrl)
        httpRequest.ContentType = "application/json"
        httpRequest.ContentLength = 0

        httpResponse = CType(httpRequest.GetResponse(), HttpWebResponse)

        Dim responseData As List(Of VmDetails) = Nothing

        If httpResponse.StatusCode = HttpStatusCode.OK Then
            responseStream = httpResponse.GetResponseStream()
        End If

        If responseStream IsNot Nothing Then
            Using reader As StreamReader = New StreamReader(responseStream)
                responseBody = reader.ReadToEnd()
            End Using
        End If

        responseData = JsonConvert.DeserializeObject(Of List(Of VmDetails))(responseBody)

        ' Dictionary to aggregate versions for each browser under each OS and OS version combination
        Dim versionAggregator As New Dictionary(Of String, Dictionary(Of String, List(Of String)))

        ' Populate the version aggregator
        For Each vm As VmDetails In responseData
            Dim key As String = $"{vm.os}_{vm.osVer}"
            For Each browser As KeyValuePair(Of String, List(Of String)) In vm.browser
                If Not versionAggregator.ContainsKey(key) Then
                    versionAggregator(key) = New Dictionary(Of String, List(Of String))
                End If
                If Not versionAggregator(key).ContainsKey(browser.Key) Then
                    versionAggregator(key)(browser.Key) = New List(Of String)
                End If
                versionAggregator(key)(browser.Key).AddRange(browser.Value)
            Next
        Next

        ' Sort the versions in the aggregator
        For Each osKey In versionAggregator.Keys
            For Each browserKey In versionAggregator(osKey).Keys
                versionAggregator(osKey)(browserKey).Sort(Function(x, y) y.CompareTo(x))
            Next
        Next

        ' Assign sorted versions back to each VM
        For Each vm As VmDetails In responseData
            Dim key As String = $"{vm.os}_{vm.osVer}"
            Dim sortedBrowsers As New Dictionary(Of String, List(Of String))
            For Each browser As KeyValuePair(Of String, List(Of String)) In vm.browser
                sortedBrowsers.Add(browser.Key, New List(Of String)(versionAggregator(key)(browser.Key)))
            Next
            vm.browser = sortedBrowsers
        Next

        Return responseData
    End Function


End Class
