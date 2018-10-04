@wip
Feature:
  AS A user
  I WANT to be able to share information
  SO THAT I can let other people know about drugs news and information

  Scenario: I should be able to share news articles to all the social I am using
    Given I am on a drug page
    When I click share
    Then I should see a list of social media provider I can share the page on

