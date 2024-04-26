Imports System.IO
Imports System.Net

Partial Class BCloudConnectorV2

    Private _webClient As New Net.WebClient



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
            ' ServicePointManager.Expect100Continue = True
            ' ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12

            Dim uri = New Uri(URL)
            _webClient.Headers.Add("Content-Type", "application/json")

            Dim requestBytes = System.Text.Encoding.Default.GetBytes(jsonData)

            Dim responseBytes = _webClient.UploadData(uri, "POST", requestBytes)

            Dim responseString = Text.Encoding.UTF8.GetString(responseBytes)

            ' Console.WriteLine(responseString)

            Dim p = Newtonsoft.Json.JsonConvert.DeserializeObject(responseString, GetType(T))


            Return CType(p, T)
        End SyncLock
    End Function

    Private Function callServicePost(Of T)(ByVal URL As String, token As String, ByVal jsonData As String, ByVal opkeyurl As String) As T
        SyncLock _webClient

            'TODO: Remove this before moving to production
            'ServicePointManager.ServerCertificateValidationCallback = Function()
            '                                                              Return True
            '                                                          End Function
            ' ServicePointManager.Expect100Continue = True
            ' ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12

            Dim uri = New Uri(URL)
            _webClient.Headers.Add("Content-Type", "application/json")
            _webClient.Headers.Add("token", token)
            _webClient.Headers.Add("origin", "https://browser.node-stg.pcloudy.com")



            Dim requestBytes = System.Text.Encoding.Default.GetBytes(jsonData)

            Dim responseBytes = _webClient.UploadData(uri, "POST", requestBytes)

            Dim responseString = Text.Encoding.UTF8.GetString(responseBytes)

            ' Console.WriteLine(responseString)

            Dim p = Newtonsoft.Json.JsonConvert.DeserializeObject(responseString, GetType(T))


            Return CType(p, T)
        End SyncLock
    End Function




    Private Function callServiceGet(Of T)(ByVal URL As String, token As String, ByVal opkeyurl As String) As T
        SyncLock _webClient

            'TODO: Remove this before moving to production
            'ServicePointManager.ServerCertificateValidationCallback = Function()
            '                                                              Return True
            '                                                          End Function
            ' ServicePointManager.Expect100Continue = True
            ' ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12

            Dim uri = New Uri(URL)
            _webClient.Headers.Clear()
            _webClient.Headers.Add("Content-Type", "application/json")
            _webClient.Headers.Add("token", token)
            _webClient.Headers.Add("origin", _opkeyBaseUrl)

            '  Dim requestBytes = System.Text.Encoding.Default.GetBytes(jsonData)
            '  Dim responseBytes = _webClient.UploadData(uri, "POST", requestBytes)
            Dim responseString = _webClient.DownloadString(uri)
            ' Dim responseString = Text.Encoding.UTF8.GetString(responseBytes)

            ' Console.WriteLine(responseString)
            Try
                Dim p = Newtonsoft.Json.JsonConvert.DeserializeObject(responseString, GetType(T))
                Return CType(p, T)
            Catch ex As Exception
                Console.WriteLine("Error during deserialization: " & ex.Message)
                Return Nothing
            End Try
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

End Class
