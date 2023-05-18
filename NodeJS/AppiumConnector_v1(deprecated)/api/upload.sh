curl -X POST -F "file=@$1" -F "source_type=raw" -F "token=$2" -F "filter=all" "https://$3/api/upload_file"
