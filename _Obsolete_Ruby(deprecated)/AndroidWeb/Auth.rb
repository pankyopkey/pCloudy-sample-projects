      
      require 'net/http'
      require 'uri'
      require "base64"
      require 'httparty'
      require 'json'
      
      $cloudUrl=''
      def initializeCloudUrl(cUrl)
         $cloudUrl=cUrl
      end


      def authenticateUser(email,apikey)
        uri = URI($cloudUrl+'/access')

        Net::HTTP.start(uri.host, uri.port,
          :use_ssl => uri.scheme == 'https', 
          :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

          request = Net::HTTP::Get.new uri.request_uri

          request.basic_auth email,apikey
        response = http.request request # Net::HTTPResponse object
        
        my_hash = JSON.parse(response.body).to_s

        # puts response.code

        # puts response
        if Net::HTTPSuccess and !my_hash.include?"error"
           # puts response.body
	   puts 'User Authenticated'
           return  JSON.parse(response.body)['result']['token']
         else
      	 # puts response.body
        return JSON.parse(response.body)['result']['error']
      end
      end
      end


      def getDevices(authToken,duration,platform,available_now)

        uri = URI($cloudUrl+'/devices')
        Net::HTTP.start(uri.host, uri.port,
          :use_ssl => uri.scheme == 'https', 
          :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

          request = Net::HTTP::Get.new uri.request_uri

          user = { 
                    "token":authToken,
                    "duration":duration, 
                    "platform":platform, 
                    "available_now":available_now
                  }

          request = Net::HTTP::Post.new(uri.request_uri)
          request.body = user.to_json
          response = http.request(request)

          # models= result.models
          models = JSON.parse(response.body)['result']['models']
           # puts models         
          for i in models
            puts "Id: #{i['id']} #{i['full_name']}"
          end    

      end
      end
          
      def bookDevices(authToken,platform,devices,duration,sessionName)

        uri = URI($cloudUrl+'/appium/init')
        Net::HTTP.start(uri.host, uri.port,
          :use_ssl => uri.scheme == 'https', 
          :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

          request = Net::HTTP::Get.new uri.request_uri

          user = { 
                    "token":authToken,
                    "devices":devices, 
                    "duration":duration, 
                    "platform":platform,
                    "session":sessionName,
                    "overwrite_location":true
                  }

          request = Net::HTTP::Post.new(uri.request_uri)
          request.body = user.to_json
          response = http.request(request)

          platformName = JSON.parse(response.body)['result']['device_ids'][0]
          return platformName

          # puts response.body
          # return response
      end
      end

      def initAppiumHubForBrowser(authToken,browserName)

        uri = URI($cloudUrl+'/appium/execute')
        Net::HTTP.start(uri.host, uri.port,
          :use_ssl => uri.scheme == 'https', 
          :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

          request = Net::HTTP::Get.new uri.request_uri

          user = { 
                    "token":authToken,
                    "browserName":browserName
                  }
	  now=Time.now
	  puts "Start Init #{now}"

          request = Net::HTTP::Post.new(uri.request_uri)
          request.body = user.to_json
          response = http.request(request)

	  now=Time.now
	  puts "End Init #{now}"

          #puts response.body
          
      end
      end

      def initAppiumHubForApp(authToken,uploadedApp)

        uri = URI($cloudUrl+'/appium/execute')
        Net::HTTP.start(uri.host, uri.port,
          :use_ssl => uri.scheme == 'https',
          :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

          request = Net::HTTP::Get.new uri.request_uri

          user = {
                    "token":authToken,
                    "app":uploadedApp
                  }
	  
	  now=Time.now
          puts "Start Init #{now}"

          request = Net::HTTP::Post.new(uri.request_uri)
          request.body = user.to_json
          response = http.request(request)

	  now=Time.now
          puts "End Init #{now}"

         # puts response.body

      end
      end


      def getAppiumEndpoint(authToken)

        uri = URI($cloudUrl+'/appium/endpoint')
        Net::HTTP.start(uri.host, uri.port,
          :use_ssl => uri.scheme == 'https', 
          :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

          request = Net::HTTP::Get.new uri.request_uri

          user = { 
                    "token":authToken,
                 }

          request = Net::HTTP::Post.new(uri.request_uri)
          request.body = user.to_json
          response = http.request(request)

          #puts response.body

          endPoint = JSON.parse(response.body)['result']['endpoint']
          endpnt = URI.encode(endPoint+"/wd/hub")
	  url = URI.parse(endpnt)	
	 
          #puts "#{endPoint}/wd/hub"
	  return url

      end
      end

      def releaseSession(authToken,rid)
        
       uri = URI($cloudUrl+'/appium/update_session')
       Net::HTTP.start(uri.host, uri.port,
         :use_ssl => uri.scheme == 'https', 
         :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

         request = Net::HTTP::Get.new uri.request_uri

         user = { 
                   "token":authToken,
                   "rid":rid,
                   "release_after":0
                }

         request = Net::HTTP::Post.new(uri.request_uri)
         request.body = user.to_json
         response = http.request(request)

         #puts response.body
       end

      end


      
