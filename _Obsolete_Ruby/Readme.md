#Appium Execution using Ruby on pCloudy

1)install ruby 
     sudo apt-get install ruby(recommended ruby 2.3.1)
2)install ruby-dev 
     sudo apt install ruby2.3-dev

Gem Need To Be Installed
========================
sudo gem install httparty
sudo gem install appium_lib (for reference you can follow <https://github.com/appium/ruby_lib/blob/master/readme.md>)

-Open AndroidWeb.rb/AndroidNative.rb and Enter "Your Cloud Url", "EmailId","ApiKey" and BookDuration

-To run:
    ruby AndroidWeb.rb/ ruby AndroidNative.rb
