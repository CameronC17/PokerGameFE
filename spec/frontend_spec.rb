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
    register = @driver.find_element(class: "registerpage").attribute("outerHTML")
    expect(register).to include "<a"
    expect(register).to include "href"
    expect(register).to include "Register"
    login_text = @driver.find_element(class: "loginpage").attribute("innerHTML")
    expect(login_text).to eq "Login"
    login_link = @driver.find_element(class: "loginpage").attribute("outerHTML")
    expect(login_link).to include "a"
    expect(login_link).to include "href"
    game_text = @driver.find_element(class: "gamepage").attribute("innerHTML")
    expect(game_text).to eq "Game"
    game_link = @driver.find_element(class: "gamepage").attribute("outerHTML")
    expect(game_link).to include "a"
    expect(game_link).to include "href"
  end

  it "should provide users a way to register an account" do 
    @driver.find_element(class: "registerpage").click
    expect(@driver.title).to eq "Register"
    @driver.find_element(css: ".username input").send_keys @username
    @driver.find_element(css: ".password input").send_keys @password
    @driver.find_element(css: ".wallet input").send_keys @wallet
    @driver.find_element(css: ".registerform input").click
    submit = @driver.find_elements(css: ".registerform input")
    submit[-1].click
    expect(@driver.title).to eq "Home"
  end

  it "should provide users a way to login" do 
    @driver.find_element(class: "loginpage").click
    expect(@driver.title).to eq "Login"
    @driver.find_element(css: ".username input").send_keys @username
    @driver.find_element(css: ".password input").send_keys @password
    @driver.find_element(css: ".loginpage input").click
    submit = @driver.find_elements(css: ".loginpage input")
    submit[-1].click
    expect(@driver.title).to eq "Home"
  end

end