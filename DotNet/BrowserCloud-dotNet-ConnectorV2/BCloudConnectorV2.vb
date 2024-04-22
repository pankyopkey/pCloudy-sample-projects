


Imports System.IO
Imports System.Linq
Imports System.Net
Imports System.Net.WebRequestMethods
Imports com.ssts.pcloudy.browsercloud.AvailableBrowsersResponse
Imports Newtonsoft
Imports Newtonsoft.Json

Public Class BCloudConnectorV2

    Private _browserCloudUrl As Uri = Nothing
    Private Const _pCloudyAuthOrigin As String = "https://node-stg.pcloudy.com/api/access"
    Private Const _pCloudyBrowserOrigin As String = "https://browser.node-stg.pcloudy.com"

    Public Sub New(Optional browserCloudUrl As String = "https://qa1.dev.opkeyone.com/pcloudy/browser_cloud")
        _browserCloudUrl = New Uri(browserCloudUrl)
    End Sub




    Public Function authenticateUser(userEmail As String, pCloudyAccessKey As String) As String

        _webClient.Headers.Clear()
        _webClient.Headers(HttpRequestHeader.Authorization) = $"Basic {EncodeToBase64($"{userEmail}:{pCloudyAccessKey}")}"
        _webClient.Headers(HttpRequestHeader.ContentType) = "application/json"


        Try
            Dim responseString = _webClient.DownloadString(_pCloudyAuthOrigin)
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



    Public Function getAvailableBrowsers(browserCloudAuthToken As String, VMID As String)
        Dim url = String.Format("{0}/api/v1/" + VMID + "/get-browsers", _browserCloudUrl)

        Dim p As BrowserDTO = callServiceGet(Of BrowserDTO)(url, browserCloudAuthToken)
        Dim browserData As Dictionary(Of String, List(Of String)) = p.data


        Return browserData
    End Function


    Public Sub ProcessVmDetailsForBrowserSelection(url As String, token As String, browserName As String, browserVersion As String)
        Dim vmDetailsList = GetAllVms(token)
        For Each vmDetail In vmDetailsList
            If Not String.IsNullOrEmpty(vmDetail.os) AndAlso Not String.IsNullOrEmpty(vmDetail.osVer) Then
                Dim browserInstance = getPreferredBrowser(token, vmDetail.os, vmDetail.osVer, browserName, browserVersion, vmDetail.vmId)
            End If
        Next
    End Sub

    Public Function getPreferredBrowser(browserCloudAuthToken As String, OS_Name As String, OS_Version As String, BrowserName As String, BrowserVersion As String, VMID As String) As AvailableBrowsersResponse.BrowserInstance

        Dim allInstances = Me.getAvailableBrowsers(browserCloudAuthToken, VMID)
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
        Throw New Exception("No matching browser instance found.")
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

    Public Function bookBrowser(browserCloudAuthToken As String, VMID As String, browser As String, version As String) As String
        Dim url = String.Format("{0}/api/v1/" + VMID + "/book", _browserCloudUrl)
        Dim jsonData = <json>
                           {"browser":"@browser", "version":"@version"}
                       </json>.Value.Trim

        jsonData = jsonData.Replace("@browser", browser)
        jsonData = jsonData.Replace("@version", version)

        Dim p = callServicePost(Of ApiResponse)(url, browserCloudAuthToken, jsonData)
        If p Is Nothing OrElse p.data Is Nothing OrElse p.data.bookingDetails Is Nothing OrElse p.data.bookingDetails.Count = 0 Then
            Throw New Exception("API call failed or returned no valid booking data.")
        End If
        If p.data.bookingDetails(0).error IsNot Nothing Then
            Throw New BrowserCloudError(p.data.bookingDetails(0).error)
        End If

        ' Assuming the first booking detail contains the desired booking_id
        Return p.data.bookingDetails(0).booking_id
    End Function





    Public Function releaseBrowser(browserCloudAuthToken As String, VMID As String, bookingId As String) As ReleaseBrowserResponseDTO.ReleaseBrowserResponseResultDTO
        Dim url = String.Format("{0}/api/v1/" + VMID + "/release", _browserCloudUrl)
        Dim jsonData = <json>
                               {"bookingId": "@bookingId"} 
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@bookingId", bookingId)

        Dim p = callServicePost(Of ReleaseBrowserResponseDTO)(url, browserCloudAuthToken, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function




    Public Function initiateOpKeySpockTeleportingTunnel(browserCloudAuthToken As String, instance_id As String, userEmail As String,
                                                    Spock_Token As String) As InitiateOpKeySpockTeleportingTunnelResponseDTO.InitiateOpKeySpockTeleportingTunnelResponseResult
        Dim url = String.Format("{0}/api/initiateOpKeySpockTeleportingTunnel.php", _browserCloudUrl)
        Dim jsonData = <json>
                               {"browserCloudAuthToken": "@browserCloudAuthToken",
                                "instance_id": "@instance_id",
                                "userEmail": "@userEmail",
                                "Spock_Token": "@Spock_Token"
                               }
                           </json>.Value.Trim


        jsonData = jsonData.Replace("@browserCloudAuthToken", browserCloudAuthToken)
        jsonData = jsonData.Replace("@instance_id", instance_id)
        jsonData = jsonData.Replace("@userEmail", userEmail)
        jsonData = jsonData.Replace("@Spock_Token", Spock_Token)



        Dim p = callService(Of InitiateOpKeySpockTeleportingTunnelResponseDTO)(url, jsonData)
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

        Dim p = callServicePost(Of SetResolutionResponse)(url, browserCloudAuthToken, jsonData)
        If p.result.error IsNot Nothing Then Throw New BrowserCloudError(p.result.error)

        Return p.result
    End Function



    Public Function getResolution(browserCloudAuthToken As String, VMID As String) As String
        Dim url = String.Format("{0}/api/v1/" + VMID + "/get-resolution", _browserCloudUrl)

        Try
            Dim p = callServiceGet(Of GetResolutionResponseVm)(url, browserCloudAuthToken)
            If p Is Nothing Then
                Throw New ApplicationException("No data returned from the server.")
            End If

            Return p.resolution

        Catch ex As ApplicationException
            Console.WriteLine("error: " & ex.Message)
            Throw
        Catch ex As Exception
            Console.WriteLine("Unexpected error: " & ex.ToString())
            Throw New ApplicationException("Failed to retrieve resolution: " & ex.Message)
        End Try
    End Function


    Public Function GetAllVms(token As String) As List(Of VmDetails)
        Dim url = String.Format("{0}/api/v1/get-vms", _browserCloudUrl)
        Dim httpResponse As HttpWebResponse = Nothing
        Dim responseStream As Stream = Nothing
        Dim responseBody As String = Nothing

        Dim httpRequest As HttpWebRequest = WebRequest.Create(url)
        httpRequest.Method = "POST"
        httpRequest.Headers.Add("token", token)
        httpRequest.Headers.Add("origin", _pCloudyBrowserOrigin)
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
        Return responseData
    End Function


    Public Function GetAllVmBrowserDetails(url As String, token As String) As Dictionary(Of String, List(Of String))
        Dim httpResponse As HttpWebResponse = Nothing

        Dim responseBody As String = Nothing

        Dim httpRequest As HttpWebRequest = CType(WebRequest.Create(url), HttpWebRequest)
        httpRequest.Method = "POST"
        httpRequest.Headers.Add("token", token)
        httpRequest.Headers.Add("origin", _pCloudyBrowserOrigin)
        httpRequest.ContentType = "application/json"
        httpRequest.ContentLength = 0

        httpResponse = CType(httpRequest.GetResponse(), HttpWebResponse)

        Dim vmDetailsList As List(Of VmDetails) = Nothing

        If httpResponse.StatusCode = HttpStatusCode.OK Then
            Using responseStream As Stream = httpResponse.GetResponseStream()
                Using reader As New StreamReader(responseStream)
                    responseBody = reader.ReadToEnd()
                End Using
            End Using
            vmDetailsList = JsonConvert.DeserializeObject(Of List(Of VmDetails))(responseBody)
        End If


        Dim allBrowsers As New Dictionary(Of String, List(Of String))
        For Each vmDetail In vmDetailsList
            For Each kvp In vmDetail.browser
                Dim browserName As String = kvp.Key
                Dim versions As List(Of String) = kvp.Value
                If allBrowsers.ContainsKey(browserName) Then

                    allBrowsers(browserName) = allBrowsers(browserName).Union(versions).ToList()
                Else
                    allBrowsers.Add(browserName, versions)
                End If
            Next
        Next

        Return allBrowsers
    End Function




End Class
