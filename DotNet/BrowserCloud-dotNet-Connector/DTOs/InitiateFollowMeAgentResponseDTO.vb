Public Class InitiateFollowMeAgentResponseDTO

    Public result As InitiateFollowMeAgentResponseResult

    Public Class InitiateFollowMeAgentResponseResult

        Public messageType As String
        Public instance_id As String
        Public message As String
        Public followMeAgentActive As Boolean
        Public [Error] As String

    End Class

End Class
