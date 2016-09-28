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
    home_link = @driver.find_element(id: "homepage").attribute("outerHTML")
    expect(home_link).to include "<a", "Home"
    register_link = @driver.find_element(id: "registerpage").attribute("outerHTML")
    expect(register_link).to include "<a", "Register"
    login_link = @driver.find_element(id: "loginpage").attribute("outerHTML")
    expect(login_link).to include "a", "Login"
    game_link = @driver.find_element(id: "gamepage").attribute("outerHTML")
    expect(game_link).to include "a", "Game"
  end

  it 'should provide users a way to register an account' do
    @driver.find_element(id: "registerpage").click
    expect(@driver.title).to include "Register"
    @driver.find_element(id: "registerusername").send_keys @username
    @driver.find_element(id: "registerpassword").send_keys @password
    @driver.find_element(id: "register-button").click
    expect(@driver.title).to include "Login"
    success = @driver.find_element(id: "register-msg").attribute("innerHTML")
    expect(success).to include "You have successfully registered. Now you can login"
  end

  it 'should provide not allow users to register an account usin invalid details' do
    @driver.find_element(id: "registerpage").click
    expect(@driver.title).to include "Register"
    @driver.find_element(id: "registerusername").send_keys @username
    @driver.find_element(id: "registerpassword").send_keys @password
    @driver.find_element(id: "register-button").click
    expect(@driver.title).to include "Login"
    success = @driver.find_element(id: "register-msg").attribute("innerHTML")
    expect(success).to include "You have successfully registered. Now you can login"
  end

  it 'should provide registered users a way to login' do
    login
  end

  it 'should not allow an unregistered user to login' do
    @driver.find_element(id: "registerpage").click
    expect(@driver.title).to include "Register"
    @driver.find_element(class: "registerusername").send_keys ""
    @driver.find_element(class: "registerpassword").send_keys ""
    @driver.find_element(id: "register-button").click
    expect(@driver.title).to include "Register"
  end

  it 'should not allow an unauthorised user to visit the game page' do
    login
    @driver.find_element(id: "gamepage").click
    puts "\nThis will fail atm due to no authorisation being included"
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
      stake = @driver.find_element(id: "stake").attribute("value")
      expect(stake).to include "100"
      @driver.find_element(id: "option2").click
      stake = @driver.find_element(id: "stake").attribute("value")
      expect(stake).to include "50"
      @driver.find_element(id: "option3").click
      stake = @driver.find_element(id: "stake").attribute("value")
      expect(stake).to include "20"
      @driver.find_element(id: "stake").clear
      @driver.find_element(id: "stake").send_keys @stake
      stake = @driver.find_element(id: "stake").attribute("value")
      expect(stake).to include @stake
      @driver.get(@url)
    end
  end

end
