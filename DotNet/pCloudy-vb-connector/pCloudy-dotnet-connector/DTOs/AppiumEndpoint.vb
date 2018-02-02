Namespace pCloudy.DTO

    Public Class AppiumEndpoint

        Public Property result As AppiumEndpointResult

    End Class

    Public Class AppiumEndpointResult
        Public Property [error] As String
        Public Property endpoint As String

    End Class




    Public Class AppiumResultFolder

        Public Property result As AppiumResultFolderResult

    End Class

    Public Class AppiumResultFolderResult
        Public Property [error] As String
        Public Property folder As String

    End Class

End Namespace
