Imports System.Net
Imports ssts.util.pCloudy.DTO
Imports System.IO
Imports Renci.SshNet




Namespace pCloudy


    Public Class pCloudyClient

        Private endpoint As String = "https://device.pcloudy.com/api"

        Private _webClient As New Net.WebClient

        Public Sub New(endpoint As String)
            Me.setEndpoint(endpoint)
        End Sub

        ''' <summary>
        ''' Default Endpoint is https://device.pcloudy.com/api
        ''' </summary>
        ''' <param name="endpoint"></param>
        ''' <remarks></remarks>
        Sub setEndpoint(endpoint As String)
            If endpoint.EndsWith(".com") Then endpoint = endpoint & "/api"
            If endpoint.EndsWith(".com/") Then endpoint = endpoint & "api"
            If endpoint.EndsWith(".com/api/") Then endpoint = endpoint.Replace(".com/api/", ".com/api")

            Me.endpoint = endpoint
        End Sub

        ReadOnly Property ApiEndpoint As String
            Get
                Return endpoint
            End Get
        End Property

#Region "            Helper Methods"




        Private Function callService(Of T)(ByVal URL As String, ByVal username As String, ByVal token As String) As T
            SyncLock _webClient

                Dim _auth = String.Format("{0}:{1}", username, token)
                Dim _enc = Convert.ToBase64String(Text.Encoding.ASCII.GetBytes(_auth))
                Dim _cred = String.Format("{0} {1}", "Basic", _enc)
                _webClient.Headers(HttpRequestHeader.Authorization) = _cred

                'TODO: Remove this before moving to production
                'ServicePointManager.ServerCertificateValidationCallback = Function()
                '                                                              Return True
                '                                                          End Function

                Dim uri = New Uri(URL)
                Dim Str = _webClient.DownloadString(uri)
                Dim p = Newtonsoft.Json.JsonConvert.DeserializeObject(Str, GetType(T))
                Return CType(p, T)
            End SyncLock

        End Function

        'Private Function callService(Of T)(ByVal URL As String, ByVal data As Dictionary(Of String, String)) As T
        '    SyncLock _webClient

        '        'TODO: Remove this before moving to production
        '        'ServicePointManager.ServerCertificateValidationCallback = Function()
        '        '                                                              Return True
        '        '                                                          End Function
        '        Dim reqparm As New Specialized.NameValueCollection

        '        For Each itm In data
        '            reqparm.Add(itm.Key, itm.Value)
        '        Next

        '        Dim uri = New Uri(URL)

        '        Dim responseBytes = _webClient.UploadValues(uri, "POST", reqparm)
        '        Dim responseString = Text.Encoding.UTF8.GetString(responseBytes)
        '        Dim p = Newtonsoft.Json.JsonConvert.DeserializeObject(responseString, GetType(T))
        '        Return CType(p, T)
        '    End SyncLock
        'End Function

        Private Function callService(Of T)(ByVal URL As String, ByVal jsonData As String) As T
            SyncLock _webClient

                'TODO: Remove this before moving to production
                'ServicePointManager.ServerCertificateValidationCallback = Function()
                '                                                              Return True
                '                                                          End Function

                Dim uri = New Uri(URL)
                _webClient.Headers.Add("Content-Type", "application/json")

                Dim requestBytes = System.Text.Encoding.Default.GetBytes(jsonData)
                Dim responseBytes = _webClient.UploadData(uri, "POST", requestBytes)
                Dim responseString = Text.Encoding.UTF8.GetString(responseBytes)
                Dim p = Newtonsoft.Json.JsonConvert.DeserializeObject(responseString, GetType(T))
                Return CType(p, T)
            End SyncLock
        End Function


        Private Sub downloadFile(ByVal URL As String, ByVal jsonData As String, outputFile As FileInfo)
            SyncLock _webClient
                'TODO: Remove this before moving to production
                'ServicePointManager.ServerCertificateValidationCallback = Function()
                '                                                              Return True
                '                                                          End Function

                Dim uri = New Uri(URL)
                _webClient.Headers.Add("Content-Type", "application/octet-stream")

                Dim requestBytes = System.Text.Encoding.Default.GetBytes(jsonData)
                Dim responseBytes = _webClient.UploadData(uri, "POST", requestBytes)


                File.WriteAllBytes(outputFile.FullName, responseBytes)
            End SyncLock
        End Sub

#End Region

#Region "            General APIs"

        Function authenticateUser(Username As String, API_AccessKey As String) As String
            'curl -u "uname:pwd" https://10.0.0.2/api/access -k
            Dim url = String.Format("{0}/access", endpoint)
            Dim p = callService(Of pCloudy.DTO.pCloudyResponseDTO)(url, Username, API_AccessKey)
            If p.result.error IsNot Nothing Then Throw New UnauthorizedAccessException(p.result.error)

            Return p.result.token
        End Function

        Function getUserDetails(authToken As String) As UserDetailResultDTO
            Dim url = String.Format("{0}/get_user_details", endpoint)
            Dim jsonData = <json>
                               {"token": "@token"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)


            Dim p = callService(Of UserDetailDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            Return p.result
        End Function



        Function uploadApp(AuthToken As String, appFile As IO.FileInfo, getProgressPercentage As Action(Of Double), Optional fileTypeFilter As String = "all") As uploadFileResultDTO
            'curl -X POST -F "app=@/FOLDER/APP" -F "source_type=raw" -F "token=token" https://192.168.0.100/api/upload_file -k

            Dim url = String.Format("{0}/upload_file", endpoint)
            Dim uri = New Uri(url)

            Dim form As New MultipartForm(url)

            form.SetField("source_type", "raw")
            form.SetField("token", AuthToken)
            form.SetField("filter", fileTypeFilter)
            form.SendFile("file", appFile.FullName, getProgressPercentage)

            Dim responseString = form.ResponseText.ToString

            Dim uploadFileResult = CType(Newtonsoft.Json.JsonConvert.DeserializeObject(responseString, GetType(DTO.uploadFileDTO)), uploadFileDTO)

            If uploadFileResult.result.error IsNot Nothing Then Throw New ConnectError(uploadFileResult.result.error)

            Return uploadFileResult.result
        End Function

        Function getApplicationIfUploaded(AuthToken As String, fileName As String) As DTO.pDriveFileDTO
            Return (From itm In getAvailableApps(AuthToken) Where itm.file.ToLower = fileName.ToLower).FirstOrDefault
        End Function

        Function getAvailableApps(AuthToken As String, Optional fileLimit As Integer = 0, Optional fileFilter As String = "all") As DTO.pDriveFileDTO()
            'curl -H 'ContentType:application/json' -d '{"token":"TOKEN", "limit":5, "filter":"all"}' https://test.pcloudy.com/api/drive

            Dim url = String.Format("{0}/drive", endpoint)

            Dim jsonData = <json>
                               {"token": "@token", "limit": @limit, "filter": "@filter"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", AuthToken)
            jsonData = jsonData.Replace("@limit", fileLimit.ToString)
            jsonData = jsonData.Replace("@filter", fileFilter)

            Dim p = callService(Of GetUploadedFilesDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            Dim uploadedFiles = p.result.files

            Return uploadedFiles

        End Function

        Function getAvailableDevices(AuthToken As String, durationInMinutes As Integer, platform As String, Optional showOnlyAvailable As Boolean = False) As MobileDeviceDTO()
            Return getAvailableDevices(AuthToken, TimeSpan.FromMinutes(durationInMinutes), platform, showOnlyAvailable)
        End Function

        Function getAvailableDevices(AuthToken As String, duration As TimeSpan, platform As String, Optional showOnlyAvailable As Boolean = False) As MobileDeviceDTO()
            'curl -H "Content-Type: application/json" -d "{"token": "token", "duration": 15, "platform": "android"}" https://192.168.0.100/api/devices -k

            Dim url = String.Format("{0}/devices", endpoint)

            Dim jsonData = <json>
                               {"token": "@token", "duration": @duration, "platform": "@platform", "available_now": @available_now}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", AuthToken)
            jsonData = jsonData.Replace("@duration", duration.TotalMinutes.ToString)
            jsonData = jsonData.Replace("@platform", platform)
            jsonData = jsonData.Replace("@available_now", showOnlyAvailable.ToString.ToLower)

            Dim p = callService(Of devicesDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            Dim devices = p.result.models
            Return devices
        End Function

        Sub revokeTokenPrivileges(authToken As String)
            'curl -H "Content-Type: application/json" -d "{"token": "token"}" https://192.168.0.100/api/exit -k

            Dim url = String.Format("{0}/exit", endpoint)

            Dim jsonData = <json>
                               {"token": "@token"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)

            Dim p = callService(Of pCloudyResponseDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

        End Sub

        Public Function bookDevice(authToken As String, duration As TimeSpan, device As MobileDeviceDTO) As generic.BookingDTOResult
            Return Me.bookDevice(authToken, duration, device.id)
        End Function

        Public Function bookDevice(authToken As String, duration As TimeSpan, deviceID As Integer) As generic.BookingDTOResult
            ' https://localhost/api/book_device.php
            ' input :{"token": "xxxxx", "duration": 5, "id": 2}
            ' output :{"token": "xxxxx", "code": 200, "rid": 2}

            Dim url = String.Format("{0}/book_device", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "duration":@duration,
                                "id":@id}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@duration", duration.TotalMinutes.ToString)
            jsonData = jsonData.Replace("@id", deviceID.ToString)

            Dim p = callService(Of generic.BookingDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            'p.result.endpoint = p.result.endpoint.Replace("https://", "http://").Replace("192.168.0.100", "192.168.1.30")

            Dim returnVal = p.result
            Return returnVal
        End Function

        Public Function getDevicePageURL(authToken As String, deviceBookingDto As generic.BookingDTOResult) As Uri
            Dim url = String.Format("{0}/get_device_url", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "rid":@rid}
                           </json>.Value.Trim

            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", deviceBookingDto.rid.ToString)

            Dim p = callService(Of generic.InstantAccessEndpoint)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            Return New Uri(p.result.url)
        End Function

        Public Sub installAndLaunchApp(authToken As String, deviceBookingDto As generic.BookingDTOResult, filename As pDriveFileDTO)
            Dim url = String.Format("{0}/install_app", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "rid": "@rid",
                                "filename": "@filename"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", deviceBookingDto.rid)
            jsonData = jsonData.Replace("@filename", filename.file)

            Dim p = callService(Of pCloudyResponseDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

        End Sub

        Public Sub releaseInstantAccessBooking(authToken As String, deviceBookingDto As generic.BookingDTOResult)
            Me.releaseInstantAccessBooking(authToken, deviceBookingDto.rid)
        End Sub

        Public Sub releaseInstantAccessBooking(authToken As String, rid As Integer)
            Dim url = String.Format("{0}/release_device", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "rid": "@rid"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", rid)


            Dim p = callService(Of pCloudyResponseDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)
        End Sub


        Public Sub showInLiveView(authToken As String, deviceBookingDtos As generic.BookingDTOResult(), cycleName As String)
            Dim url = String.Format("{0}/update_automation", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "rid": "@rid",
                                "cyclename": "@cyclename"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", String.Join(",", From itm In deviceBookingDtos Select itm.rid))
            jsonData = jsonData.Replace("@cyclename", cycleName)

            Dim p = callService(Of pCloudyResponseDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)
        End Sub

        Public Function executeAdbCommand(authToken As String, deviceBookingDto As generic.BookingDTOResult, adbCommand As String) As String
            Return executeAdbCommand(authToken, CInt(deviceBookingDto.rid), adbCommand)
        End Function

        Public Function executeAdbCommand(authToken As String, deviceBookingDto As appium.BookingDtoDevice, adbCommand As String) As String
            Return executeAdbCommand(authToken, CInt(deviceBookingDto.rid), adbCommand)
        End Function

        Private Function executeAdbCommand(authToken As String, rid As Integer, adbCommand As String) As String
            Dim url = String.Format("{0}/execute_adb", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "rid": "@rid",
                                "adbCommand": "@adbCommand"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", "" & rid)
            jsonData = jsonData.Replace("@adbCommand", adbCommand)

            Dim p = callService(Of AdbCommandResponseDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            If Not String.IsNullOrEmpty(p.result.result) Then
                Return p.result.result
            Else
                Return p.result.adbReply
            End If
        End Function

        Public Function startAdbBridge(userName As String, authToken As String, deviceBookingDto As generic.BookingDTOResult) As String
            Dim url = String.Format("{0}/startDeviceTunneling", endpoint)
            'MsgBox(url)
            Dim jsonData = <json>
                               {"token": "@token",
                                "rid": "@rid"
                               }
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", "" & deviceBookingDto.rid)


            Dim p = callService(Of DeviceTunnelDto)(url, jsonData)
            'MsgBox("pPort: " & p.result.pPort)
            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            Dim pBoxAdbListenerPort = p.result.pPort
            Dim randomLocalPort = getFreePort()
            'MsgBox("Random Local Port: " & randomLocalPort)
            Dim authMethod = New PasswordAuthenticationMethod(userName, authToken)
            'MsgBox("ConnectionInfo in Host: " & New Uri(Me.ApiEndpoint).Host)
            Dim connInfo = New ConnectionInfo(New Uri(Me.ApiEndpoint).Host, 2222, userName, authMethod)
            Dim sshClient = New SshClient(connInfo)


            sshClient.Connect()
            Dim forwardedPort = New ForwardedPortLocal("127.0.0.1", randomLocalPort, "localhost", pBoxAdbListenerPort)
            sshClient.AddForwardedPort(forwardedPort)
            forwardedPort.Start()
            'MsgBox("Forwarding Port Started")

            Return "adb connect 127.0.0.1:" & randomLocalPort
        End Function


        Private Function getFreePort() As Integer
            Dim l As New Sockets.TcpListener(IPAddress.Loopback, 0)
            l.Start()
            Dim freePort = CType(l.LocalEndpoint, IPEndPoint).Port
            l.Stop()
            Return freePort
        End Function
#End Region

#Region "            Appium Specific Apis"

        Function bookDevicesForAppium(AuthToken As String,
                                      devices As IEnumerable(Of MobileDeviceDTO),
                                      duration As TimeSpan, friendlySessionName As String) As appium.BookingDtoDevice()
            'curl -H 'Content-Type: application/json' -d '{"token": "token", "duration": 15, "platform": "android", "devices" : [10]}' https://192.168.0.100/api/appium/init -k
            Dim url = String.Format("{0}/appium/init", endpoint)


            Dim jsonData = <json>
                               {"token": "@token", "duration": @duration, "platform": "@platform", 
                                "devices" : [@devices], "session" : "@session", 
                                "minimum_device_count" : "@minimum_device_count", 
                                "overwrite_location" : @overwrite_location}
                           </json>.Value.Trim

            jsonData = jsonData.Replace("@token", AuthToken)
            jsonData = jsonData.Replace("@duration", duration.TotalMinutes.ToString)
            jsonData = jsonData.Replace("@platform", devices.First.platform)
            jsonData = jsonData.Replace("@devices", String.Join(", ", (From itm In devices Select itm.id)))

            jsonData = jsonData.Replace("@session", friendlySessionName)
            jsonData = jsonData.Replace("@minimum_device_count", devices.Count.ToString) 'we need every devices to be booked, or the whole booking request to be cancelled
            jsonData = jsonData.Replace("@overwrite_location", True.ToString.ToLower)

            Dim p = callService(Of appium.BookingDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            'lets change the ids of the devices with the booking ids
            For i = 0 To devices.Count - 1
                devices(i).id = p.result.device_ids(i).capabilities.deviceName
            Next

            Return p.result.device_ids
        End Function

        Public Function initAppiumHubForApp(authToken As String, pDriveFile As pDriveFileDTO) As Uri
            Dim jsonData = <json>
                               {"token": "@token", "app" : "@app"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@app", pDriveFile.file)

            Return initAppiumHub(authToken, jsonData)

        End Function

        Public Function initAppiumHubForBrowser(authToken As String, browserName As String) As Uri
            Dim jsonData = <json>
                               {"token": "@token", "browserName" : "@browserName"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@browserName", browserName)

            Return initAppiumHub(authToken, jsonData)

        End Function

        Private Function initAppiumHub(authToken As String, jSonData As String) As Uri
            'curl -H 'Content-Type: application/json' -d '{"token": "token", "app" : "ApiDemos.apk"}' https://192.168.0.100/api/appium/execute
            Dim url = String.Format("{0}/appium/execute", endpoint)

            Dim p = callService(Of AppiumEndpoint)(url, jSonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            Dim returnVal = p.result.endpoint

            Return New Uri(returnVal)
        End Function

        Function getAppiumEndpoint(AuthToken As String) As Uri
            'curl -H 'Content-Type: application/json' -d '{"token": "token"}' https://192.168.0.100/api/appium/endpoint -k
            Dim url = String.Format("{0}/appium/endpoint", endpoint)

            Dim jsonData = <json>
                               {"token": "@token"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", AuthToken)

            Dim p = callService(Of AppiumEndpoint)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            'p.result.endpoint = p.result.endpoint.Replace("https://", "http://").Replace("192.168.0.100", "192.168.1.30")

            Dim returnVal = p.result.endpoint + "/wd/hub"

            Return New Uri(returnVal)
        End Function

        Function getAppiumReportFolder(authToken As String) As Uri
            'curl -H 'Content-Type: application/json' -d '{"token": "token"}' https://192.168.0.100/api/appium/folder -k

            Dim url = String.Format("{0}/appium/folder", endpoint)

            Dim jsonData = <json>
                               {"token": "@token"}
                           </json>.Value.Trim
            jsonData = jsonData.Replace("@token", authToken)

            Dim p = callService(Of AppiumResultFolder)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            'p.result.endpoint = p.result.endpoint.Replace("https://", "http://").Replace("192.168.0.100", "192.168.1.30")

            Dim returnVal = p.result.folder

            Return New Uri(returnVal)
        End Function

#End Region

#Region "            Recorder Specific Apis"
        <Obsolete>
        Public Sub startAndroidRecorderProcess(authToken As String, deviceBookingDto As generic.BookingDTOResult, app_package As String, app_mainActivity As String, app_isHybrid As Boolean)
            '	https://localhost/api/start_record_process.php
            '	input : {(string)token, (int)rid, (string)callback_url, (string)package, (string)mainActivity, (Boolean)isHybrid}
            '	output: true or false

            Dim url = String.Format("{0}/start_android_recorder_process", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "rid":@rid,
                                "package":"@package",
                                "mainActivity":"@mainActivity",
                                "isHybrid":"@isHybrid"}
                           </json>.Value.Trim

            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", deviceBookingDto.rid.ToString)
            jsonData = jsonData.Replace("@package", app_package)
            jsonData = jsonData.Replace("@mainActivity", app_mainActivity)
            jsonData = jsonData.Replace("@isHybrid", app_isHybrid.ToString)

            Dim p = callService(Of recorder.StartRecorderProcess)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            'Return p.result.URL
        End Sub

        Public Function fetchRecordedSteps(authToken As String, deviceBookingDto As generic.BookingDTOResult) As recorder.RecorderStep()
            Dim url = String.Format("{0}/fetch_recorder_steps", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "rid":@rid}
                           </json>.Value.Trim

            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", deviceBookingDto.rid.ToString)

            Dim p = callService(Of recorder.FetchRecordedStepsReply)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            Return p.result.data

            '	return dto.result.data; // new URL(dto.result.URL);

        End Function


        Public Sub startRecorderV2(authToken As String, deviceBookingDto As generic.BookingDTOResult, arguments As String)
            '	https://localhost/api/startRecorderV2

            Dim url = String.Format("{0}/startRecorderV2", endpoint)

            Dim jsonData = <json>
                               {"token": "@token",
                                "rid":@rid,
                                "arguments":"@arguments"}
                           </json>.Value.Trim

            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", deviceBookingDto.rid.ToString)
            jsonData = jsonData.Replace("@arguments", arguments)


            Dim p = callService(Of pCloudyResponseDTO)(url, jsonData)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)

            'Return p.result.URL
        End Sub

#End Region


#Region "New Methods by Mitali"


        Public Function chooseSingleDevice(authToken As String, platform As String) As MobileDeviceDTO
            Return Me.chooseMultipleDevices(authToken, platform, False).Single
        End Function

        Public Function chooseMultipleDevices(authToken As String, platform As String) As List(Of MobileDeviceDTO)
            Return Me.chooseMultipleDevices(authToken, platform, True)
        End Function



        Public Sub releaseAppiumSession(authToken As String, rid As Integer)
            Me.extendAppiumSession(authToken, rid, TimeSpan.FromSeconds(0))
        End Sub

        Public Sub releaseAppiumSession(authToken As String, bookingDto As appium.BookingDtoDevice)
            Me.releaseAppiumSession(authToken, bookingDto.rid)

        End Sub

        Public Sub extendAppiumSession(authToken As String, bookingDto As appium.BookingDtoDevice, releaseAfter As TimeSpan)
            Me.extendAppiumSession(authToken, bookingDto.rid, releaseAfter)
        End Sub


        Public Sub extendAppiumSession(authToken As String, rid As Integer, releaseAfter As TimeSpan)

            Dim url = String.Format("{0}/appium/update_session", endpoint)


            Dim jsonData = <json>
                               {"token": "@token", "rid": "@rid", "release_after": "@release_after"}
                           </json>.Value.Trim

            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", "" & rid)
            jsonData = jsonData.Replace("@release_after", "" & releaseAfter.TotalMinutes)

            Dim p = callService(Of pCloudyResponseDTO)(url, jsonData)
            'Console.Out.WriteLine("Output:" + p)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)
            'Return p.result.device_ids

        End Sub

        Public Function takeDeviceScreenshot(authToken As String, rid As Integer) As CaptureDeviceScreenshotResultDto

            Dim url = String.Format("{0}/capture_device_screenshot", endpoint)


            Dim jsonData = <json>
                               {"token": "@token", "rid": "@rid"}
                           </json>.Value.Trim

            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@rid", "" & rid)
            'jsonData = jsonData.Replace("@release_after", "" + releaseAfter.TotalMinutes)

            Dim p = callService(Of CaptureDeviceScreenshotDto)(url, jsonData)
            'Console.Out.WriteLine("Output:" + p)

            If p.result.error IsNot Nothing Then Throw New ConnectError(p.result.error)
            Return p.result

        End Function

        Public Function downloadFileFromCloud(authToken As String, fileName As String, dir As String) As System.IO.FileInfo

            Dim url = String.Format("{0}/download_file", endpoint)


            Dim jsonData = <json>
                               {"token": "@token", "filename": "@filename", "dir": "@dir"}
                           </json>.Value.Trim

            jsonData = jsonData.Replace("@token", authToken)
            jsonData = jsonData.Replace("@filename", fileName)
            jsonData = jsonData.Replace("@dir", dir)


            Dim name = Path.GetFileNameWithoutExtension(fileName)
            Dim extension = Path.GetExtension(fileName)

            Dim tmpFile = New FileInfo(Path.Combine(Path.GetTempPath, name & extension))


            Me.downloadFile(url, jsonData, tmpFile)
            Return tmpFile

        End Function


        Private Function chooseMultipleDevices(authToken As String, platform As String, multipleDevices As Boolean) As List(Of MobileDeviceDTO)
            Dim selectedDevices As New List(Of MobileDeviceDTO)

            Dim devices = Me.getAvailableDevices(authToken, 5, platform, True)
            For i = 1 To devices.Length
                Dim aDevice = devices(i - 1)

                log(formatString(i & ").", 6) + formatString(aDevice.manufacturer + " " + aDevice.display_name, 50) + "      v" + aDevice.version)
            Next
            log("")

            If multipleDevices Then
                log("Select multiple devices(comma separated)")
                Dim commaSeparatedDevices = Console.In.ReadLine.Replace(" ", "")
                For Each itm In commaSeparatedDevices.Split(",")
                    Dim selectedDevice = devices(CInt(itm))
                    selectedDevices.Add(selectedDevice)
                Next

            Else
                log("Select a single device")
                Dim selectedLine = CInt(Console.In.ReadLine)
                Dim selectedDevice = devices(selectedLine - 1)
                selectedDevices.Add(selectedDevice)
            End If

            Return selectedDevices

        End Function

        Private Function formatString(text As String, width As Integer)
            Return text.PadRight(width)
        End Function

        Private Sub log(text As String)
            Console.Out.WriteLine(text)
        End Sub

#End Region



    End Class


End Namespace