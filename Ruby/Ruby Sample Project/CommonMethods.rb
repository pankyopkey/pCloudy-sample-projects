require 'rubygems'
require './AppiumConnector'
require 'set'

def chooseDevicesFromfulllist(authToken, duration, platform)

  response = getDevices(authToken, 10, 'Android', true)

  models = JSON.parse(response.body)['result']['models']

  for i in models
    puts "Id: #{i['id']} #{i['full_name']}"
  end

  puts 'Choose Multiple Devices(Comma separated) :'
  puts '=========================================='

  response = gets.chomp
  array = response.split(/,/)
  return array
end

def chooseDevicesAmongManufacturer(authToken, platform, manufacturerName, maxCount)
  names = Array.new
  response = getDevices(authToken, 10, 'Android', true)
  models = JSON.parse(response.body)['result']['models']

  for i in models
    if (manufacturerName.eql? i['manufacturer'].to_s)
      names.push(i['id'])
    end
  end

  return names.shuffle[0, maxCount]

end

def chooseDevicesBetweenVersion(authToken, platform, lower, higher, maxCount)
  names = Array.new
  response = getDevices(authToken, 10, 'Android', true)
  models = JSON.parse(response.body)['result']['models']

  for i in models
    if (i['version'].between?(lower.to_s, higher.to_s))
      names.push(i['id'])
    end
  end
  return names.shuffle[0, maxCount]
end

def chooseFixedDevicesList(authToken, platform, deviceList)
  availableNames = Array.new
  notAvailableNames = Array.new
  notAvailableDevice = Hash.new

  response = getDevices(authToken, 10, 'Android', true)
  models = JSON.parse(response.body)['result']['models']

  responseNotAvailable = getDevices(authToken, 10, 'Android', false)
  modelsNotAvailable = JSON.parse(responseNotAvailable.body)['result']['models']

  for i in models
    if (deviceList.include? i['full_name'])
      availableNames.push(i['id'])
    else
      for j in modelsNotAvailable
        if (deviceList.include? j['full_name'])
          fullName = j['full_name']
          if (j['available'].to_s.eql? 'false')
            notAvailableDevice[fullName] = j['available']
            notAvailableNames.push(j['id'])
          end
        end
      end

    end
  end

  notAvailableDevice.keys

  for i in 0..notAvailableDevice.keys.size - 1
    puts notAvailableDevice.keys[i].to_s + " Not Available"
  end
  # puts names

  return availableNames
end

def authentication(cloudUrl, emailId, apiKey)

  initializeCloudUrl(cloudUrl)
  authToken = authenticateUser(emailId, apiKey)
  return authToken

end

def bookDevicesForAppium(authToken, platform, array, bookDuration, sessionName)
  aDevice = bookDevices(authToken, platform, array, bookDuration, sessionName)
  return aDevice
end

def getServerUrl(authToken, uploadedApp)

  initAppiumHubForApp(authToken, uploadedApp)
  endPoint = getAppiumEndpoint(authToken)
  return endPoint

end


