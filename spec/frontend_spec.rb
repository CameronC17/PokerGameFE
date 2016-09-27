describe "Poker game front end" do 

  before:all do 
    @driver = Selenium::WebDriver.for :chrome
    @url = "http://127.0.0.1:8080/"
    @username = "test1"
    @password = "password"
    @wallet = "100"
  end

  before:each do 
    @driver.get(@url)
  end

  it 'should have a home page that shows links to register, login and the game' do 
    register = @driver.find_element(id: "homepage").attribute("outerHTML")
    expect(register).to include "<a"
    expect(register).to include "href"
    expect(register).to include "Home"
    register = @driver.find_element(id: "registerpage").attribute("outerHTML")
    expect(register).to include "<a"
    expect(register).to include "href"
    expect(register).to include "Register"
    login_link = @driver.find_element(id: "loginpage").attribute("outerHTML")
    expect(login_link).to include "a"
    expect(login_link).to include "href"
    expect(login_link).to include "Login"
    game_link = @driver.find_element(id: "gamepage").attribute("outerHTML")
    expect(game_link).to include "a"
    expect(game_link).to include "href"
    expect(game_link).to include "Game"
  end

  it "should provide users a way to register an account" do 
    @driver.find_element(id: "registerpage").click
    expect(@driver.title).to include "Register"
    @driver.find_element(class: "username").send_keys @username
    @driver.find_element(class: "password").send_keys @password
    submit = @driver.find_elements(css: ".loginform input")
    submit[-1].click
    # expect(@driver.title).to include "Login"
  end

  it "should provide users a way to login" do
    @driver.find_element(id: "loginpage").click
    expect(@driver.title).to include "Login"
    @driver.find_element(class: "username").send_keys @username
    @driver.find_element(class: "password").send_keys @password
    submit = @driver.find_elements(css: ".loginform input")
    submit[-1].click
    # expect(@driver.title).to include "Game"
  end

end