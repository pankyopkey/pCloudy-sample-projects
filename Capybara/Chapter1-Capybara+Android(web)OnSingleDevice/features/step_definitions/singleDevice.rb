  Given /^Open URL (.*)$/ do |url|
    visit url
  end

  When /^Enter username$/ do 
    page.find(:id,"userId").
    native.send_keys('test@pcloudy.com', :enter)
  end

  When /^Enter Password$/ do 
    page.find(:id,"password").
    native.send_keys('test1234', :enter)
  end

  When /^Click on login$/ do 
    page.find(:id,"loginSubmitBtn").
    click
  end

  
