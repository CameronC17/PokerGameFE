describe "Poker game front end" do 

  before:all do 
    @driver = Selenium::WebDriver.for :chrome
    @url = "localhost:3000"
    @username = ""
    @email = ""
    @password = ""
    @wallet = ""
  end

  before:each do 
    @driver.get(@url)
  end

  it 'should have a home page that shows links to register, login and the game' do 
    register_text = @driver.find_element(class: "registerpage").attribute("innerHTML")
    expect(register_text).to eq "Register"
    register_link = @driver.find_element(class: "registerpage").attribute("outerHTML")
    expect(register_link).to include "a"
    expect(register_link).to include "href"
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
    

  end

  it "should provide users a way to login" do 

  end

end