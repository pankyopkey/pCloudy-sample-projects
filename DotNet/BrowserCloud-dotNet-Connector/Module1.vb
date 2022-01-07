Module Module1

    Sub Main()
        Dim con = New BCloudConnector()
        Dim token = con.authenticateUser(New Uri("https://device.pcloudy.com"), "anshuman.chatterjee@sstsinc.com", "j9pscbzbxymhbp5px72jv398")

        Dim browsers = con.getAvailableBrowsers(token)


        Console.Read()

    End Sub

End Module
