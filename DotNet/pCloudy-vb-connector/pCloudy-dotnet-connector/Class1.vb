Imports Renci.SshNet

Public Class Class1

    Public Shared Sub Main(ParamArray args As String())



        Dim con = New pCloudy.pCloudyClient("https://device.pcloudy.com")


        Dim userName = "anshuman.chatterjee@sstsinc.com"
        Dim authToken = con.authenticateUser(userName, "qxvdsgwbrdj6dh2xwg9v6xgr")
        Dim aDevice = con.chooseSingleDevice(authToken, "android")

        Dim bookedDevice = con.bookDevice(authToken, TimeSpan.FromMinutes(10), aDevice)

        Dim adbComand = con.startAdbBridge(userName, authToken, bookedDevice)
        Console.WriteLine(adbComand)


        Console.ReadKey()

        con.releaseInstantAccessBooking(authToken, bookedDevice)

    End Sub

End Class
