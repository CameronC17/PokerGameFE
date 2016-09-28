describe "Poker game front end" do

  before:all do
    @driver = Selenium::WebDriver.for :chrome
    @url = "localhost:3001"
    @username = "testz"
    @password = "password"
    @wallet = 100
    @stake = "1000"
    @invalid_username = "invalid invalid invalid"
    @invalid_password = "thisisawrongpassword"
  end

  before:each do
    @driver.get(@url)
  end

  it 'should have a home page that shows links to register, login and the game' do
    expect(@driver.find_element(id: "homepage").attribute("outerHTML")).to include "<a", "Home"
    expect(@driver.find_element(id: "registerpage").attribute("outerHTML")).to include "<a", "Register"
    expect(@driver.find_element(id: "loginpage").attribute("outerHTML")).to include "a", "Login"
    expect(@driver.find_element(id: "gamepage").attribute("outerHTML")).to include "a", "Game"
  end

  it 'should provide users a way to register an account' do
    @driver.find_element(id: "registerpage").click
    expect(@driver.title).to include "Register"
    @driver.find_element(id: "registerusername").send_keys @username
    @driver.find_element(id: "registerpassword").send_keys @password
    @driver.find_element(id: "register-button").click
    expect(@driver.title).to include "Login"
    expect(@driver.find_element(id: "register-msg").attribute("innerHTML")).to include "You have successfully registered. Now you can login"
  end

  it 'should not allow users to register an account using invalid details' do
    @driver.find_element(id: "registerpage").click
    expect(@driver.title).to include "Register"
    # This will currently fail due to allowing you to register with nothing in the fields
    @driver.find_element(id: "register-button").click
    expect(@driver.title).to include "Register"
    expect(@driver.find_element(id: "register-msg").attribute("innerHTML")).to include "Please enter a valid username and password."
    @driver.find_element(id: "registerusername").send_keys @username
    @driver.find_element(id: "register-button").click
    expect(@driver.title).to include "Register"
    expect(@driver.find_element(id: "register-msg").attribute("innerHTML")).to include "Please enter a valid username."
    @driver.find_element(id: "registerpassword").send_keys @password
    @driver.find_element(id: "register-button").click
    expect(@driver.title).to include "Register"
    expect(@driver.find_element(id: "register-msg").attribute("innerHTML")).to include "Please enter a valid password."
  end

  it 'should provide registered users a way to login' do
    login
  end

  it 'should not allow an unregistered user to login' do
    @driver.find_element(id: "loginpage").click
    expect(@driver.title).to include "Login"
    @driver.find_element(id: "username").send_keys @invalid_username
    @driver.find_element(id: "password").send_keys @invalid_password
    @driver.find_element(id: "login-button").click
    expect(@driver.title).to include "Login"
    expect(@driver.find_element(id: "login-msg").attribute("innerHTML")).to include "A user does not exist with the given details"
  end

  it 'should not allow an unauthorised user to visit the game page' do
    @driver.find_element(id: "gamepage").click
    # This will fail atm due to no authorisation being included
    expect(@driver.title).to include "Login"
    expect(@driver.page_source).to include "You must login first before joining a game"
  end

  it 'should allow the user to select different stakes for single player and multiplayer games' do
    # Once authorisation is working I will need a login method made and linked here
    gametype = ["single", "multiplayer"]
    2.times do |i|
      @driver.find_element(id: "gamepage").click
      @driver.find_element(id: gametype[i]).click
      @driver.find_element(id: "option1").click
      expect(@driver.find_element(id: "stake").attribute("value")).to include "100"
      @driver.find_element(id: "option2").click
      expect(@driver.find_element(id: "stake").attribute("value")).to include "50"
      @driver.find_element(id: "option3").click
      expect(@driver.find_element(id: "stake").attribute("value")).to include "20"
      @driver.find_element(id: "stake").clear
      @driver.find_element(id: "stake").send_keys @stake
      expect(@driver.find_element(id: "stake").attribute("value")).to include @stake
      @driver.get(@url)
    end
  end

  it 'should allow a game to be started and the first cards to be dealt' do
    # click start button
    # check the flop has occurred
    # check each player has 2 cards
  end

end
